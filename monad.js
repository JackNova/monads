(function () {
    "use strict";

    /*Macroid used to define monads*/
    function MONAD() {
        return function unit(value) {
            var monad = Object.create(null);
            monad.bind = function (func, args) {
                if (args) {
                    return func(value, ...args);
                } else {
                    return func(value);
                }
            };
            return monad;
        };
    }

    /*Define the identity monad*/
    var identity = MONAD();
    var monad = identity("Hello World");
    monad.bind(console.log);

}());
