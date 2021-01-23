$('#image_selector').change(function(){
	let reader = new Filereader();
	reader.onload = function(){
		let dataURL = reader.result;
		$('#selected-image').attr('src',dataURL);
	}
	let file = $('#image-selector').prop('files')[0];
	reader.readAsDataURL(file);
});

let model;
(async function(){
	model = await tf.loadLayersModel('model/model.json');
})();


$('#predict-button').click(async function(){
console.log('clicked');
  let image = $('#selected-image').get(0);
  let tensor = tf.fromPixels(image).reshape([1, 96, 96, 1]).toFloat();


  let predictions = await model.predict(tensor).data();


  console.log(predictions);

})