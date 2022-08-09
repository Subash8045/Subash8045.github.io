function dispatchAlgor()
{
    const t  = document.getElementById('C').innerHTML;
    let m = document.getElementById('message').value;
    let key = document.getElementById('key').value;
    const check = document.getElementById('encrypt').checked;


    if(t == 'A')
    {
        atbash(m);
    }
    else if (m === '' || key === '')
    {
     alert("Input Fields are Empty");   
    }

    else if(t == 'C')
    {
        if (check){
        cesarCipher(m);
        }
        else{
            deCeasar(m);
        }
    }
    
    else if(t == 'V')
    {
        if (check){
            vernam(m);
            }
            else{
                deVernam(m);
            }
    }
    else if(t == 'G')
    {
        if(check)
        genere(m,key);
        else
        deGenere(m,key)
        
    }
    else if(t == 'R')
    {
        if(check)
        railfence(m,key);
        else
        deRailfence(m,key)
    }

}




function algor(t)
{
    const txt  = document.getElementById('C');
    txt.innerHTML = t;
    const ciph = document.getElementById('ciph_text');
    if(t == 'C')
    {
        ciph.innerHTML = "Caesar Cipher";
    }
    else if(t == 'A')
    {
        ciph.innerHTML = "Atbash Cipher";
    }
    else if(t == 'V')
    {
        ciph.innerHTML = "Vernam Cipher";
    }
    else if(t == 'G')
    {
        ciph.innerHTML = "viGenere Cipher";
    }
    else if(t == 'R')
    {
        ciph.innerHTML = "Railfence Cipher";
    }
}


//cesar cipher

function cesarCipher(m)
{
    let key = parseInt(document.getElementById('key').value);
    if(isNaN(key)){
        alert("enter number");
        return;
    }
    let mes = m.toUpperCase();
    let ciph_mes= '';

    for(let i =0;i<mes.length;i++)
    {
        if(!isNaN(parseInt(mes[i])) || mes[i] === ' ')
        {
            continue;
        }
        let n = mes.charCodeAt(i) - 65;
        ciph_mes = ciph_mes + String.fromCharCode(((n+key)%26)+65);
    }
    document.getElementById('cal_txt').innerHTML = ciph_mes; 
}

function deCeasar(m)
{
    let key = parseInt(document.getElementById('key').value);
    if(isNaN(key)){
        alert("enter number");
        return;
    }
    
    let mes = m.toUpperCase();
    let ciph_mes= '';

    for(let i =0;i<mes.length;i++)
    {
        if(!isNaN(parseInt(mes[i])) || mes[i] === ' ')
        {
            continue;
        }
        let n = mes.charCodeAt(i) - 65;
        if(n - key <0)
        {
        let v = 26 + n - key;
        ciph_mes = ciph_mes + String.fromCharCode(((v)%26)+65);
        }
        else
        ciph_mes = ciph_mes + String.fromCharCode(((n-key)%26)+65);
    }
    document.getElementById('cal_txt').innerHTML = ciph_mes; 
}


//vernam cipher

function vernam(msg) {
    let k = document.getElementById('key').value;
    let ciph_mes = '';
    let mes = msg.toUpperCase()
    let key = k.toUpperCase()
    for(let i =0;i<mes.length;i++)
    {
        let n = mes.charCodeAt(i) - 65;
        let m = key.charCodeAt(i) -65;
        ciph_mes = ciph_mes + String.fromCharCode(((n+m)%26)+65);
    }

    document.getElementById('cal_txt').innerHTML = ciph_mes; 

  }

  function deVernam(msg) {
    let k = document.getElementById('key').value;
    let ciph_mes = '';
    let mes = msg.toUpperCase()
    let key = k.toUpperCase()
    for(let i =0;i<mes.length;i++)
    {
        let n = mes.charCodeAt(i) - 65;
        let m = key.charCodeAt(i) -65;
        if(n-m < 0)
        {
            let v = 26 + n-m;
            ciph_mes = ciph_mes + String.fromCharCode(((v)%26)+65);
        }
        else
        ciph_mes = ciph_mes + String.fromCharCode(((n-m)%26)+65);
    }

    document.getElementById('cal_txt').innerHTML = ciph_mes; 

  }

  //Railfence

  function railfence(m,k)
  {
    let msg = m.toUpperCase();
    let key = parseInt(k);
    if(isNaN(key)){
        alert("enter number");
        return;
    }
    if(key === 1)
    {
        alert("1 not allowed");
        return;
    }
    let arr = [];

    for(let i =0;i<key;i++)
    {
        arr[i] = [];
    }
    let up = 0;
    let down = 1;
    let it1 = 0;
    let it2 = 0;
    for(let i =0;i < msg.length;)
    {
        for(;it1<key ;)
        {
            if(it1 < 0)
            {
                break;
            }
            arr[it1][it2] = msg[i];
            i = i + 1;

            if(down === 1)
            {
                it1++;
                it2++;
            }
            if(up === 1)
            {
                it1--;
                it2++;
            }
        }
        if(up === 1)
        {
            down =1;
            up =0;
            it1 = it1+2;

        }
        else{
            up = 1;
            down = 0;
            it1--;
            it1--;
        }
    }
    let cip = '';
    for(let i =0;i<arr.length;i++)
    {
        for(let k =0;k<arr[i].length;k++)
        {
            if(arr[i][k] !== undefined)
            cip = cip + arr[i][k];
        }
    }
    document.getElementById('cal_txt').innerHTML = cip; 
  }


  function deRailfence(m,k)
  {
    let msg = m.toUpperCase();
    let key = parseInt(k);
    let cip ='';
    if(isNaN(key)){
        alert("enter number");
        return;
    }
    if(key === 1)
    {
        alert("1 not allowed");
        return;
    }
    let arr = [];

    for(let i =0;i<key;i++)
    {
        arr[i] = [];
    }
    let up = 0;
    let down = 1;
    let it1 = 0;
    let it2 = 0;
    let row = -1;
    for(let i =0;i < msg.length;)
    {
        row++;
        it1 = 0;
        it2 = 0;
        for(let f =0;f<msg.length;){
             
        for(;it1<key ;)
        {
            if(it1 < 0)
            {
                break;
            }
            if(it1 === row){
            arr[it1][it2] = msg[i];
            i = i + 1;
            }

            if(down === 1)
            {
                it1++;
                it2++;
            }
            if(up === 1)
            {
                it1--;
                it2++;
            }
            f++;
        }
        if(up === 1)
        {
            down =1;
            up =0;
            it1 = it1+2;
            //f++;

        }
        else{
            up = 1;
            down = 0;
            it1--;
            it1--;
            //f++;
        }

    }
    }
        it1 = 0;
        it2 = 0;
        for(let f =0;f<msg.length;f++){
             
        for(;it1<key ;)
        {
            if(it1 < 0)
            {
                break;
            }
            if(arr[it1][it2] !== undefined ){
            cip = cip + arr[it1][it2];
            f++;
            }
            if(down === 1)
            {
                it1++;
                it2++;
                
            }
            if(up === 1)
            {
                it1--;
                it2++;
            }
        }
        if(up === 1)
        {
            down =1;
            up =0;
            it1 = it1+2;
            
        }
        else{
            up = 1;
            down = 0;
            it1--;
            it1--;
        }
        f--;
        
    }
    document.getElementById('cal_txt').innerHTML = cip; 
    }

// vig

function genere(m,k)
{
    let arr = [];

    for(let i =0;i<26;i++)
    {
        a=[]
        let d = i;
        for(let j =0;j<26;j++)
        {
            a[j] = d % 26;
            d++;
        }
        arr[i] = a;
    }
    let msg = m.toUpperCase();
    let key = k.toUpperCase();
    let ke = key;
    let it =0;
    for(let i = key.length-1;i<msg.length-1;i++)
    {
        key = key + ke[it % ke.length];
        it++;
    }

    let cip = '';
    for(let i=0;i<msg.length;i++)
    {
        cip = cip + String.fromCharCode((arr[msg.charCodeAt(i) - 65][key.charCodeAt(i) - 65])+65);
    }
    document.getElementById('cal_txt').innerHTML = cip; 


}

function deGenere(m,k)
{
    let key = k.toUpperCase();
    let msg = m.toUpperCase();
    let ke = key;
    let it =0;
    for(let i = key.length-1;i<msg.length-1;i++)
    {
        key = key + ke[it % ke.length];
        it++;
    }
    let cip = '';
    for(let i =0;i<msg.length;i++)
    {
        cip = cip + String.fromCharCode(((msg.charCodeAt(i)-65-(key.charCodeAt(i)-65)+26)%26 + 65));
    }
    document.getElementById('cal_txt').innerHTML = cip; 

}

//atbash

function atbash(m)
{
    let msg = m.toUpperCase();

    let cip = '';
    for(let i =0;i<msg.length;i++)
    {
        cip = cip + String.fromCharCode(25 - (msg.charCodeAt(i)-65)+65);
    }
    document.getElementById('cal_txt').innerHTML = cip; 
}





const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');
const b3 = document.getElementById('b3');
const b4 = document.getElementById('b4');
const b5 = document.getElementById('b5');

const btn = [b1,b2,b3,b4,b5];
const txt = ['C','A','V','G','R']
const  cal = document.getElementById('cal');
for(let i =0; i < btn.length; i++)
{
    btn[i].addEventListener('click',function(){
        algor(txt[i])
    });
}

cal.addEventListener('click',dispatchAlgor);



