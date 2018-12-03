let previousPos;
let currentPos;
let pointCount;
let points=[];
let padding;
let tolerance;

function setup() {
    createCanvas(800, 600);
    background(51);
    padding = 20;
    pointCount = 5;
    tolerance = 0.5;
    let r;
    if(height<width) r = (height-2*padding)/2;
    else r = (width-2*padding)/2;
    for(let i = 0;i<pointCount;i++){
        let angle = i*TWO_PI/pointCount;
        console.log(angle);
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

function draw() {
    let prevSelected = random(points);
    for (let i = 0; i < 100; i++) {
        let randomSelected = random(points);
        if(randomSelected != prevSelected){
            currentPos.x= lerp(previousPos.x, randomSelected.x,tolerance);
            currentPos.y= lerp(previousPos.y, randomSelected.y,tolerance);
            point(currentPos.x, currentPos.y);
            previousPos=currentPos;
            prevSelected = randomSelected;
        }
    }
}