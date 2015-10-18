(function () {
    "use strict";

    /*Macroid used to define monads*/
    function MONAD(modifier) {
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

            if (typeof modifier === 'function') {
                modifier(monad, value);
            }

            return monad;
        }

        unit.method = function (name, func) {
            prototype[name] = func;
            return unit;
        };

        unit.lift = function (name, func) {
            prototype[name] = function () {
                return unit(this.bind(func, arguments));
            };
            return unit;
        };

        return unit;
    }

    /*Define the identity monad*/
    var ajax = MONAD()
        .lift('log', console.log);

    var monad = ajax("hello world");
    monad.log('extra argument', 'sexy');

    var maybe = MONAD(function (monad, value) {
        if (value === null || value === undefined) {
            monad.is_null = true;
            monad.bind = function () {
                return monad;
            };
        }
    });

    monad = maybe(null);
    monad.bind(console.log);


}());
