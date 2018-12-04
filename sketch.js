let previousPos;
let currentPos;
let pointCount;
let points=[];
let padding;
let tolerance;
let differ;
let redraw;

function setup() {
    createCanvas(800, 600);
    padding = 20;
    pointCount = createSlider(1,20,3,1);
    tolerance = createSlider(0.1, 0.9, 0.5, 0.1);
    redraw = createButton("Redraw!");
    redraw.mousePressed(init);
    differ = createCheckbox("Differ algorithm");
    differ.changed(init);
    init();
}

function draw() {
    let prevSelected = random(points);
    for (let i = 0; i < 100; i++) {
        let randomSelected = random(points);
        if(randomSelected != prevSelected || differ.checked()){
            currentPos.x= lerp(previousPos.x, randomSelected.x,tolerance.value());
            currentPos.y= lerp(previousPos.y, randomSelected.y,tolerance.value());
            point(currentPos.x, currentPos.y);
            previousPos=currentPos;
            prevSelected = randomSelected;
        }
    }
}

function init(){
    background(51);
    points = [];
    let r;
    if(height<width) r = (height-2*padding)/2;
    else r = (width-2*padding)/2;
    for(let i = 0;i<pointCount.value();i++){
        let angle = i*TWO_PI/pointCount.value();
        points.push(new p5.Vector(
            r*Math.cos(angle)+width/2,
            r*Math.sin(angle)+height/2
        ));
        //points.push(new p5.Vector(random(0,width),random(0,height)));
    }
    previousPos=new p5.Vector(random(0,width),random(0,height));
    currentPos = new p5.Vector();

    strokeWeight(4);
    stroke(255,0,0);
    for(let i =0;i<points.length;i++){
        point(points[i].x, points[i].y);
    }

    stroke(255);
    strokeWeight(1);
}