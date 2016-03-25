// If we list all the natural numbers below 10 that are 
//multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

//Find the sum of all the multiples of 3 or 5 below 1000.



multiples();
function multiples(){
var i=0
var storage[];

	for(i=0;i<1000;i++){
		var x=i%3 //(x=1) where i is 1 to 1000
		var y=i%5
		var z=i%9
			if(x||y||z==0){
				storage.push(i);
			
			 }
		}
}alert(i)
