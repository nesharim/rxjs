let {Observable} = require('rxjs/Observable');
require('rxjs/add/observable/from');
require('rxjs/add/operator/mergeMap'); // flatMap is an alias of mergeMap

function getDrinks() {

    let beers = Observable.from([
        {name: "Stella", country: "Belgium", price: 9.50},
        {name: "Sam Adams", country: "USA", price: 8.50},
        {name: "Bud Light", country: "USA", price: 6.50}
    ]);

    let softDrinks = Observable.from([
        {name: "Coca Cola", country: "USA", price: 1.50},
        {name: "Fanta", country: "USA", price: 1.50},
        {name: "Lemonade", country: "France", price: 2.50}
    ]);

    return Observable.create( observer => {

            observer.next(beers);        // pushing the beer pallet (observable)
            observer.next(softDrinks);   // pushing the soft drinks pallet (observable)
            observer.complete();
        }
    );
}

// We want to unload each pallet and print the into about each case with drinks

getDrinks()
    .flatMap(drinks => drinks)           // unloading drinks from pallets
    .subscribe(
        drink => console.log("Subscriber got " + drink.name + ": " + drink.price ),
        error => console.err(error),
        () => console.log("The stream of observables is over")
    );










/*
 // AN alternative (bad) solution with nested subscribtions
 getDrinks()
 .subscribe( pallet =>
 pallet.subscribe(
 drink => console.log("Nested subscriber got " + drink.name + ": " + drink.price ),
 error => console.err(error),
 () => console.log("The stream of nested observables is over"))
 ,
 error => console.err(error),
 () => console.log("The stream of source observables is over")
 );

 */

