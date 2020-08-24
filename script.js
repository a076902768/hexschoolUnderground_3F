console.clear();
var app=new Vue({
  el: '#app',
  data: { 
    result: 0,//紀錄結果
    lastResult: 0,//紀錄上一次的結果
    inputHistory: '',//紀錄算式
    inputNumber: '',//顯示數字
    keys: [
      {value: '7',
       type: 'number'},
      {value: '8',
       type: 'number'},
      {value: '9',
       type: 'number'},
      {value: '÷',
       type: '/'},
      {value: '4',
       type: 'number'},
      {value: '5',
       type: 'number'},
      {value: '6',
       type: 'number'},
      {value: '×',
       type: '*'},
      {value: '1',
       type: 'number'},
      {value: '2',
       type: 'number'},
      {value: '3',
       type: 'number'},
      {value: '+',
       type: '+'},
      {value: '0',
       type: 'number'},
      {value: '00',
       type: 'number'},
      {value: '.'},
      {value: '-',
       type: '-'},
      {value: 'AC',
       type: 'AC'},
      {value: '⌫',
       type: '⌫'}
    ]
  },
  methods: {
    preProcess: function(value,type){    
      if(this.lastResult!=''){
        this.inputNumber='';
        this.inputNumber+=this.lastResult;
        this.lastResult='';
      }//如果運算時，有紀錄上次的結果，則將上次的結果存入inputNumber並將lastResult清空
      if(value=='+'){
        var L=this.inputNumber.length;
        var lastStr=this.inputNumber.substring(L-1);
        if(lastStr=='+' || lastStr=='-' || lastStr=='*' || lastStr=='/'){
          var temp=this.inputNumber.substring(0,L-1);
          this.inputNumber=temp+'+';
        }//運算元替換
        else{
        this.inputNumber+='+';
        }
      }
      else if(value=='-'){
        var L=this.inputNumber.length;
        var lastStr=this.inputNumber.substring(L-1);
        if(lastStr=='+' || lastStr=='-' || lastStr=='*' || lastStr=='/'){
          var temp=this.inputNumber.substring(0,L-1);
          this.inputNumber=temp+'-';
        }//運算元替換
        else{
        this.inputNumber+='-';
        }
      }
      else if(value=='×'){
        var L=this.inputNumber.length;
        var lastStr=this.inputNumber.substring(L-1);
        if(lastStr=='+' || lastStr=='-' || lastStr=='*' || lastStr=='/'){
          var temp=this.inputNumber.substring(0,L-1);
          this.inputNumber=temp+'*';
        }//運算元替換
        else{
        this.inputNumber+='*';
        }
      }
      else if(value=='÷'){
        var L=this.inputNumber.length;
        var lastStr=this.inputNumber.substring(L-1);
        if(lastStr=='+' || lastStr=='-' || lastStr=='*' || lastStr=='/'){
          var temp=this.inputNumber.substring(0,L-1);
          this.inputNumber=temp+'/';
        }//運算元替換
        else{
        this.inputNumber+='/';
        }
      }
      else if(value=='⌫'){
        var L=this.inputNumber.length; 
        var temp=this.inputNumber.substring(0,L-1);
        this.inputNumber=temp;
      }
      else if(value=='AC'){
        this.result=0;
        this.lastResult=0;
        this.inputHistory='';
        this.inputNumber='';
      }
      else{
        this.inputNumber+=value;
      }//其他普通按鍵    
    },
    Result: function(){
      if(this.inputNumber!=''){
        this.inputHistory=this.inputNumber;
        this.result=eval(this.inputNumber);
        this.lastResult=this.result;
        this.inputNumber=this.result;
      } 
    }  // =
  },
  watch: {
    inputNumber: function(){
      if(this.inputNumber.length<=10){
        $('#show_L').css('font-size','56px');
      }
      if(24>this.inputNumber.length && this.inputNumber.length>10){
        $('#show_L').css('font-size','24px');
      }else if(this.inputNumber.length>24){
        $('#show_L').css('font-size','12px');
      }
    }//監控顯示器是否超過範圍
  }
});

$('.key').hover(
  function(){
    $(this).addClass('keyhover');
  },
  function(){
    $(this).removeClass('keyhover');
});