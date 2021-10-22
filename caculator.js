/*
* max: 999999999999
* min: -999999999999
*/
let operatorPattern="[+\\-*/^]";
let operandPattern="[+-]?(?:\\d+)?\\.?\\d+"
class ExpressionElement{
    constructor(elem){
        let operatorRegex=new RegExp(`^${operatorPattern}$`);
        let operandRegex=new RegExp(`^${operandPattern}$`);
        switch(true){
            case operatorRegex.test(elem):
                return operator.createOperator(elem);
            case operandRegex.test(elem):
                return new operand(elem);
            default:
                return parentheses.createParentheses(elem);
        }
    }
}
class operand{
    value
    constructor(op){
        this.value= safeResult(Number(op));
    }
}
class operator{
    proprity
    constructor(p){
        this.proprity=p;
    }
    static createOperator(op){
        switch(op){
            case "^":
                return new expon(op);
                break;
            case "*":
                return new multi(op);
                break;
            case "/":
                return new devid(op);
                break;
            case "+":
                return new add(op);
                break;
            case "-":
                return new minus(op);
                break;
        }
    }
}
class add extends operator{
    constructor(op){
        super(1);
    }
    calc(n1,n2){
        return safeResult(n1+n2);
    }
}
class minus extends operator{
    constructor(op){
        super(1);
    }
    calc(n1,n2){
        return safeResult(n1-n2);
    }
}
class multi extends operator{
    constructor(op){
        super(2);
    }
    calc(n1,n2){
        return safeResult(n1*n2);
    }
}
class devid extends operator{
    constructor(op){
        super(2);
    }
    calc(n1,n2){
        return safeResult(n1/n2);
    }
}
class expon extends operator{
    constructor(op){
        super(3);
    }
    calc(n1,n2){
        return safeResult(Math.pow(n1,n2));
    }
}
class parentheses{
    static createParentheses(op){
        if(op==="(")return new parenthesesLeft();
        else return new parenthesesRight();
    }
    }
}
class parenthesesLeft extends parentheses{
}
class parenthesesRight extends parentheses{
}


const MAX_NUM=1e12-1;
const MIN_NUM=-1e12+1;

function expressionValidation(expStr){
    let expression=expStr;
    let basicExpressionPattern=new RegExp(`^${operandPattern}(?:${operatorPattern}${operandPattern})*$`);
    let inparenthesesPattern=/(?<=\()[^()]+(?=\))/g;
    let outparenthesesPattern=/\([^()]+\)/g;
    let matchResult;
    while(matchResult=expression.match(inparenthesesPattern)){
        for(let subExpression of matchResult){
            if(!basicExpressionPattern.test(subExpression))return false;
            //if(!basicExpressionPattern.test(subExpression))throw new Error("invalid expression");
        }
        expression=expression.replace(outparenthesesPattern,"0");
        /*expression=expression.replace(outparenthesesPattern,function(matchStr){
            let infixArr=matchStr.match(inparenthesesPattern)[0].split(expressionSplitPattern);
            return postfixCal(infixToPofix(infixArr));
        })
        console.log(expression)*/
    }
    //console.log(expression)
    if(!basicExpressionPattern.test(expression))return false;
    //if(!basicExpressionPattern.test(expression))throw new Error("invalid expression");
    //return postfixCal(infixToPofix(expression.split(expressionSplitPattern)));
    return true;
}
function safeResult(result){
    if(result>MAX_NUM)return MAX_NUM;
    else if(result<MIN_NUM)return MIN_NUM;
    return result
}
// function getp(op){
//     switch(true){
//         case /^\^$/.test(op):
//             return 3;
//         case /^(\*|\/)$/.test(op):
//             return 2;
//         case /^(\+|-)$/.test(op):
//             return 1;
//         case /^(([\+-]?\d*(\.\d+)?)|\(|\))$/.test(op):
//             return 0;
//         default:
//             return -1;
//     }
// }
/*function validTest(infixArr){
    let b_stack=[];
    for(let op of infixArr){
        if(getp(op)<0)return false;
        if(op==="(")b_stack.push(op);
        else if(op===")"){
            if(b_stack.length===0)return false;
            b_stack.pop();
        }
        console.log(b_stack)
    }
    return b_stack.length===0;
}*/
function infixToPofix(infix){
    let operatorStack=[];
    let output=[];
    for(let op of infix){
        //f(op==='('){
        if(op instanceof parenthesesLeft){
            operatorStack.push(op);
        }
        //else if(op===')'){
        else if(op instanceof parenthesesRight){
            while(true){
                let p=operatorStack.pop();
                if(p instanceof parenthesesLeft)break;
                output.push(p);
            }
        }
       // else if(getp(op)>0){
        else if(op instanceof operator){
            while(operatorStack.length>0){
                      let topop=operatorStack.pop();
                      //if(getp(op)<=getp(topop)){
                      if(op.proprity<=topop.proprity){
                          output.push(topop)
                      }
                      else{
                          operatorStack.push(topop);
                          break;
                      }
            }
            operatorStack.push(op)
        }
        else output.push(op);
    }
    while(operatorStack.length>0) output.push(operatorStack.pop());
    return output;
}
// function opcal(st,operator){
//     let operand2=st.pop();
//     let operand1=st.pop();
//     if(operator==='^')return safeResult(Math.pow(operand1,operand2));
//     else return safeResult(eval(`${operand1} ${operator} ${operand2}`))
// }
function postfixCal(pofix){
    let tempStack=[];
    for(let op of pofix){
        //if(getp(op)>0)tempStack.push(opcal(tempStack,op))
        if(op instanceof operator){
            let n2=tempStack.pop();
            let n1=tempStack.pop();
            tempStack.push(op.calc(n1,n2));
        }
        else tempStack.push(op.value);
    }
    return tempStack.pop();
}
/*entry */
function caculator(calStr){
    let expressionSpliter=/(?<=[^\.])(?=[^\d\.])|(?<=[^\d\.+-])(?=[^\.])|(?<![^\d].)(?=\.)|(?<=\d[+-])(?=\d)/
    calStr=calStr.replace(/\s/g,"");
    if(!expressionValidation(calStr)){
        alert("invalid infix");
        throw new Error("invalid infix");
    }
    let infixArr=calStr.split(expressionSpliter).map(op=>new ExpressionElement(op));
    return postfixCal(infixToPofix(infixArr));
    //return expressionValidation(calStr);
}
