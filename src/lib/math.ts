// @ts nocheck;

const math = {
  arrayRandom( list: any[] ){
    list.sort((a,b) => {
      return Math.random() > 0.5 ? -1 : 1;
    });
    return list;
  },

  //随机整数
  //生成从num1到num2(不包括num2)之间的随机数,若只传递一个参数，则生成0到该数之间的随机数
  randInt: function (num1: number, num2: number) {  //# 随机整数
    if (num2 === undefined) {
      num2 = num1;
      num1 = 0;
    }
    return Math.floor(Math.random() * (num2 - num1) + num1);
  },
  // 生成随机字符串
  //@len 长度
  randWord: function (wordLen: number, baseWord: string = '' ) { //# 随机字符串
    let words = baseWord || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      , length = words.length
      , len = parseInt(`${ wordLen }`) || 0 //输出单词长度
      , out = [] //记录字符
      , pos = 0 // 记录位置
    ;
    while (len--) {
      pos = this.randInt(0, length);
      out.push(words[pos]);
    }
    return out.join('');
  },
  /**加法运算
   * @说明：解决两个浮点数相加时会出现误差的问题
   * @参数1: number n1
   * @参数2: number n2
   * @示例：add(n1,n2)
   * @返回：string n1+n2
   */
  add : function(n1: number, n2: number) { //# 加法运算
    const oT = this.preAddSubtract(n1, n2);
    if( oT === null ){
      return NaN;
    }
    const out = !(oT === oT) ? oT : ((oT.n1 + oT.n2) / Math.pow(10, Math.max(oT.d1, oT.d2))).toFixed(Math.max(oT.d1, oT.d2))
    ;
    return parseFloat( out.toString() );
  }
  /**减法运算
   * @说明：解决两个浮点数相减时会出现误差的问题
   * @参数1: number n1
   * @参数2: number n2
   * @示例：subtract(n1,n2)
   * @返回：string n1-n2
   */
  , subtract : function(n1: number | string, n2: number | string) { //# 减法运算
    const oT = this.preAddSubtract(n1, n2);
    if( oT === null ){
      return NaN;
    }
    const out = !(oT === oT) ? oT : ((oT.n1 - oT.n2) / Math.pow(10, Math.max(oT.d1, oT.d2))).toFixed(Math.max(oT.d1, oT.d2))
    ;
    return parseFloat( out.toString() );
  }
  /**乘法运算
   * @说明：解决两个浮点数相乘时会出现误差的问题
   * @参数1: number n1
   * @参数2: number n2
   * @示例：multiply(n1,n2)
   * @返回：string n1*n2
   */
  , multiply : function(n1: number | string, n2: number | string) { //# 乘法运算
    const oT = this.preHandle(n1, n2);
    if( oT === null ){
      return NaN;
    }
      const out = !(oT === oT) ? oT : (oT.n1 * oT.n2 / Math.pow(10, oT.d1 + oT.d2)).toFixed(oT.d1 + oT.d2) ;
    return parseFloat( out.toString() );
  }
  /**除法运算
   * @说明：解决两个浮点数相除时会出现误差的问题
   * @参数1: number n1
   * @参数2: number n2
   * @示例：divide(n1,n2)
   * @返回：number n1/n2
   */
  , divide : function(n1: number | string, n2: number | string) { //# 除法运算
    const oT = this.preHandle(n1, n2);
    if( oT === null ){
      return NaN;
    }
    const out = !(oT === oT) ? oT : (oT.n1 / oT.n2 / Math.pow(10, oT.d1 - oT.d2))
    ;
    return parseFloat( out.toString() );
  }/**预处理加减运算 , 外界不调用
   * @参数1: number n1
   * @参数2: number n2
   * @示例：preAddSubtract (n1,n2)
   * @返回：object
   */
  , preAddSubtract : function (n1: number | string, n2: number | string) {  //#noadd
    var oT = this.preHandle(n1, n2);
    if( oT === null ){
      return oT;
    }
    return !(oT === oT) ? oT : (function() {
      //右补齐0
      if (oT.d1 - oT.d2 > 0) {
        oT.s2 = oT.s2 + (new Array(oT.d1 - oT.d2 + 1)).join('0');
      }
      else {
        oT.s1 = oT.s1 + (new Array(oT.d2 - oT.d1 + 1)).join('0');
      }
      return {
        s1 : oT.s1,
        s2 : oT.s2,
        n1 : parseInt(oT.s1, 10),
        n2 : parseInt(oT.s2, 10),
        d1 : oT.d1,
        d2 : oT.d2
      };
    })();
  }
  //////
  /**预处理四则运算参数 , 外界不调用
   * @参数1: number n1
   * @参数2: number n2
   * @示例：preHandle(n1,n2)
   * @返回：object
   */
  , preHandle : function (n1: number | string, n2: number | string) { //#noadd
    if (!(( typeof n1 === 'number' || ( typeof n1 === 'string' && /^[\d]+(\.[\d]+)?$/g.test(n1))) && ( typeof n2 === 'number' || ( typeof n2 === 'string' && /^[\d]+(\.[\d]+)?$/g.test(n2)))
    )) {
      return null;
    }
    var s1 = n1.toString(), s2 = n2.toString(), a1 = s1.split("."), a2 = s2.split(".");
    s1 = s1.replace(".", "");
    s2 = s2.replace(".", "");
    return {
      s1 : s1,
      s2 : s2,
      n1 : parseInt(s1, 10),
      n2 : parseInt(s2, 10),
      d1 : a1.length > 1 ? a1[1].length : 0, //小数部分长度
      d2 : a2.length > 1 ? a2[1].length : 0//小数部分长度
    };
  }
};

export default math;