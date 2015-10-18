(function () {
    "use strict";

    /*Macroid used to define monads*/
    function MONAD() {
        var prototype = Object.create(null);

        function unit(value) {
            var monad = Object.create(prototype);
            monad.bind = function (func, args) {
                if (args) {
                    return func(value, ...args);
                } else {
                    return func(value);
                }
            };
            return monad;
        }

        unit.method = function (name, func) {
            prototype[name] = func;
            return unit;
        };

        return unit;
    }

    /*Define the identity monad*/
    var identity = MONAD();
    var monad = identity("Hello World");
    monad.bind(console.log);

}());
