
class Comparator {
    static isLessThan(a, b) {
        var a_num = parseFloat(a);
        var b_num = parseFloat(b);
        if (isNaN(a_num) || isNaN(b_num))
            return a < b;
        else
            return a_num < b_num;
    }
}
