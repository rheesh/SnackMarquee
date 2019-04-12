/**
 * @overview Simple text marquee class
 * last modified : 2019.04.12
 * @author Seungho.Yi <rh22sh@gmail.com>
 * @package SnackMarquee
 * @Version 1.0.0
 * @license MIT
 * @see https://github.com/rheesh/SnackMarquee
 */

class SnackMarquee{

    constructor(options){
        const opt = {
            mode: 'right',
            speed: 100,
            space: 20,
            font: 'Arial, Helvetica, sans-serif',
            size: 24,
            color: 'white',
            background: 'black',
            width: 0,
            height: 0,
            children: [],
        };
        let {selector, mode, color, background, speed, space, font, size, width, height, children}
            = Object.assign( opt, options);
        this.flag = 0;
        this.selector = selector;
        this._mode = mode;
        this._color = color;
        this._background = background;
        this._font = font;
        this._speed = speed;
        this._space = space;
        this._size = size;
        this._width = width;
        this._height = height;
        this.wrapper = $(selector);
        this.viewport = null;
        this.textBox = [null, null];
        this.interval = 0;
        this.translation = 0;
        this.textWidth = 0;
        this.children = Array.from(children);
        this.build();
        this.start = this.start.bind(this);
        this.play = this.play.bind(this);
        this.worker = null;
    }

    get length(){
        return this.children.length;
    }

    get mode() {
        return this._mode;
    }
    set mode(value) {
        this._mode = value;
        this.restart();
    }

    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this.viewport.css('color', value);
    }

    get background() {
        return this._background;
    }
    set background(value) {
        this._background = value;
        this.viewport.css('background-color', value);
    }

    get font() {
        return this._font;
    }
    set font(value) {
        this._font = value;
        this.restart();
    }

    get size(){
        return this._size;
    }
    set size(value){
        this._size = value;
        this.restart();
    }

    get space() {
        return this._space;
    }
    set space(value) {
        this._space = value;
        this.restart();
    }

    get speed(){
        return this._speed/1000;
    }
    set speed(value) {
        this._speed = value;
        this.restart();
    }

    get width(){
        if(this._width === 0){
            return this.wrapper.width();
        }
        return this._width;
    }
    set width(value){
        this._width = value;
        this.viewport.css('width', this.width);
        this.restart();
    }

    get height(){
        if(this._height === 0){
            return this.wrapper.height();
        }
        return this._height;
    }
    set height(value){
        this._height = value;
        this.viewport.css('height', this.height);
        let top = (this.height-this.size)/2 - 1;
        this.viewport.children('div').css('top', top);
    }

    get(idx){
        return this.children[idx];
    }
    set(idx, value){
        this.children[idx] = value;
        this.restart();
    }

    add(idx, value){
        this.children.push(value);
        this.restart();
    }
    insert(idx, value){
        this.children.splice(idx, 0, value);
        this.restart();
    }
    delete(idx){
        this.children.splice(idx, 1);
        this.restart();
    }

    killTranslation(i){
        this.textBox[i].addClass('notransition');
        this.textBox[i].css({transition: 'none', transform: '',});
        let res = this.textBox[i].get(0).offsetHeight;
        this.textBox[i].removeClass('notransition');
        return res;
    }

    initialPosition(){
        let top = (this.height-this.size)/2 - 1;
        for(let i=0; i<2; i++){
            if(this.mode === 'left') {
                this.textBox[i].css({
                    top: top>0 ? top : 0,
                    left: -this.textWidth,
                    width: this.textWidth,
                    transition: '',
                    transform: '',
                });
            }else{
                this.textBox[i].css({
                    top: top>0 ? top : 0,
                    left: this.width,
                    width: this.textWidth,
                    transition: '',
                    transform: '',
                });
            }
        }
    }

    calcInterval(){

        let width = [0,0];
        for(let i=0; i<2; i++){
            width[i] = this.textBox[i].width();
        }
        this.textWidth = width[0] > width[1] ? width[0] : width[1];
        if(this.textWidth < this.width){
            this.textWidth = this.width;
        }else{
            this.textWidth += this.size;
        }
        this.interval = this.textWidth/this.speed + 10;
        this.translation= (this.textWidth+this.width)/(this.speed*1000);
    }

    setText(){
        let space = '';
        for(let i=0; i<this.space; i++){
            space += '&nbsp;';
        }
        let text = '';
        for(let child of this.children){
            if(this.mode === 'left')
                text += space + child;
            else
                text += child + space;
        }
        for(let i=0; i<2; i++){
            this.textBox[i].css({
                width: '',
                fontSize: this.size,
                fontFamily: this.font,
            });
            this.textBox[i].html(text);
        }
    }

    build(){
        let viewport = '<div class="slider-viewport" ></div>';
        let textBox = [
            '<div class="slide0 snackslide"></div>',
            '<div class="slide1 snackslide"></div>',
        ];
        this.wrapper.append(viewport);
        this.viewport = this.wrapper.children('.slider-viewport');
        this.viewport.css({
            width: this.width,
            height: this.height,
            color: this.color,
            backgroundColor: this.background,
        });
        this.viewport.append(textBox);
        this.textBox = [ this.viewport.children('.slide0'), this.viewport.children('.slide1') ];
        this.setText();
        this.calcInterval();
        this.initialPosition();
    }

    get transformValue(){
        if(this.mode === 'left') {
            return "translateX(" + (this.textWidth+this.width) + "px)";
        }else {
            return "translateX(-" + (this.textWidth+this.width) + "px)";
        }
    }

    play(){
        let flag = this.flag;

        if(this.mode === 'left') {
            this.textBox[flag].css({left: -this.textWidth, transition: 'none', transform: ''});
        }else {
            this.textBox[flag].css({left: this.width, transition: 'none', transform: ''});
        }
        this.textBox[flag].css({
            transition: "transform " + this.translation + "s linear",
            transform: this.transformValue,
        });

        this.flag = 1 - flag;
    }

    start(){
        if(this.length === 0) return;
        this.initialPosition();
        this.play();
        this.worker = setInterval(this.play, this.interval);
    }

    destroy(){
        clearInterval(this.worker);
        this.worker = null;
        this.killTranslation(0);
        this.killTranslation(1);
    }

    stop(){
        this.destroy();
    }

    restart(){
        let flag = this.worker;
        if(flag) this.destroy();
        this.setText();
        this.calcInterval();
        this.initialPosition();
        if(flag) this.start();
    }
}
