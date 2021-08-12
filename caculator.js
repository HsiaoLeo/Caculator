function getp(op){
    switch(op){
        case '^':
            return 3;
        case '*':case '/':
            return 2;
        case '+':case '-':
            return 1;
        default:
            return 0;
    }
}
function infixToPofix(infix){
    let infixArr=infix.split(/\s+/);
    let operatorStack=[];
    let output=[];
    for(let op of infixArr){
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
    if(operator==='^')return Math.pow(operand1,operand2);
    else return eval(`${operand1}${operator}${operand2}`)
}
function postfixCal(pofix){
    let tempStack=[];
    for(let op of pofix){
<<<<<<< HEAD
        if(getp(op)>0) tempStack.push(opcal(tempStack,op))
=======
        if(getp(op)>0)tempStack.push(opcal(tempStack,op))
>>>>>>> 261676a765a73c0f39e2ae37ae369d4b8fbfc877
        else tempStack.push(Number(op));
    }
    return tempStack.pop();
}