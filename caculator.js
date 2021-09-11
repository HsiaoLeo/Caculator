/*
* max: 999999999999
* min: -999999999999
*/
const MAX_NUM=999999999999;
const MIN_NUM=-999999999999;

function safeResult(result){
    if(result>MAX_NUM)return MAX_NUM;
    else if(result<MIN_NUM)return MIN_NUM;
    return result
}
function getp(op){
    switch(true){
        case /^\^$/.test(op):
            return 3;
        case /^(\*|\/)$/.test(op):
            return 2;
        case /^(\+|-)$/.test(op):
            return 1;
        case /^(([\+-]?\d*(\.\d+)?)|\(|\))$/.test(op):
            return 0;
        default:
            return -1;
    }
}
function validTest(infixArr){
    let b_stack=[];
    for(let op of infixArr){
        if(getp(op)<0)return false;
        if(op==="(")b_stack.push(op);
        else if(op===")"){
            if(b_stack.length===0)return false;
            b_stack.pop();
        }
    }
    return true;
}
function infixToPofix(infix){
    let operatorStack=[];
    let output=[];
    for(let op of infix){
        if(op==='('){
            operatorStack.push(op);
        }
        else if(op===')'){
            while(true){
                let p=operatorStack.pop();
                if(p==='(')break;
                output.push(p);
            }
        }
        else if(getp(op)>0){
            while(operatorStack.length>0){
                      let topop=operatorStack.pop();
                      if(getp(op)<=getp(topop)){
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
function opcal(st,operator){
    let operand2=st.pop();
    let operand1=st.pop();
    console.log(`${operand1}${operator}${operand2}`)
    if(operator==='^')return safeResult(Math.pow(operand1,operand2));
    else return safeResult(eval(`${operand1} ${operator} ${operand2}`))
}
function postfixCal(pofix){
    let tempStack=[];
    for(let op of pofix){
        if(getp(op)>0)tempStack.push(opcal(tempStack,op))
        else tempStack.push(Number(op));
    }
    return tempStack.pop();
}
/*entry */
function caculator(calStr){
    let infixArr=calStr.split(/\s+/);
    if(!validTest(infixArr)){
        alert("invalid infix");
        throw new Error("invalid infix");
    }
    return postfixCal(infixToPofix(infixArr));
}