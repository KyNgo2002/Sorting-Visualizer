import React, {Component} from 'react'
//VARIABLES AND CONSTANTS
const numBars = 100;
const min = 5;
const max = 600;
var barHeight = [];
var bars = [];


export default class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
        };
    }
    
    //GENERATES AN ARRAY WHEN THE COMPONENT MOUNTS TO THE DOM
    componentDidMount(){
        this.generateArray();     
    }
    //GENERATES A NEW ARRAY
    generateArray(){
        
        const array = [];
        for(let i = 0; i < numBars; i++){
            //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
            array.push(Math.floor(Math.random() * (max - min + 1)) + min);
            barHeight[i] = array[i];
            
        }
        this.setState({array});
    }

    // HELPER FUNCTION TO UPDATE DIV COLORS:
    updateDiv(index, color){
        setTimeout(function (){
            bars[index].style.backgroundColor = color;
        }, );
            
        
    }
    
    // BELOW HERE LIES AN ASSORTMENT OF SORTING ALGORITHMS
    // BELOW HERE LIES AN ASSORTMENT OF SORTING ALGORITHMS
    // BELOW HERE LIES AN ASSORTMENT OF SORTING ALGORITHMS
    
    InsertionSort(){
        for(let i = 1; i < barHeight.length; i++){
            for(let j = i; j > 0; j--){
                if(barHeight[j] < barHeight[j - 1]){
                    let temp = barHeight[j];
                    barHeight[j] = barHeight[j - 1];
                    barHeight[j - 1] = temp;
                    bars[j].style.height = barHeight[j] + "px";
                    bars[j - 1].style.height = barHeight[j - 1] + "px";
                }
                
            }
        }
    }
    SelectionSort(){
        let min = 0;
        let minInd = 0;
        for(let i = 0; i < barHeight.length; i++){
            min = barHeight[i];
            minInd = i;
            for(let j = i; j < barHeight.length; j++){
                if(barHeight[j] < min){
                    min = barHeight[j];
                    minInd = j;
                }
            }
            let temp = barHeight[i];
            barHeight[i] = min;
            barHeight[minInd] = temp;
            bars[i].style.height = barHeight[i] + "px";
            bars[minInd].style.height = barHeight[minInd] + "px";
        }
    }

    BubbleSort(){
        for(let i = 0; i < barHeight.length - 1; i++){
            for(let j = 0; j < barHeight.length - i - 1; j++){
                if(barHeight[j] > barHeight[j + 1]){
                    let temp = barHeight[j];
                    barHeight[j] = barHeight[j + 1];
                    barHeight[j + 1] = temp;
                    bars[j].style.height = barHeight[j] + "px";
                    bars[j + 1].style.height = barHeight[j + 1] + "px";
                }               
            }
        }  
    }
    
    merge(first, middle, end){
        let i = first;
        let j = middle + 1;
        let k = 0;
        let arr = [];
        for(var a = first; a <= end; a++){
            if(i > middle){
                arr[k++] = barHeight[j++];
            }
            else if(j > end){
                arr[k++] = barHeight[i++];
            }
            else if(barHeight[i] < barHeight[j]){
                arr[k++] = barHeight[i++];
            }
            else{
                arr[k++] = barHeight[j++];
            }
        }
        for(let t = 0; t < k; t++){
            barHeight[first++] = arr[t];
            bars[first - 1].style.height = arr[t] + "px";
        }
    }
    

    MergeSort(firstInd, secondInd){
        if(firstInd < secondInd){
            let middle = Math.floor((firstInd + secondInd) / 2);
            this.MergeSort(firstInd, middle);
            this.MergeSort(middle + 1, secondInd);
            this.merge(firstInd, middle, secondInd);
        }
    }

    Partitions(first, second){
        let pivot = barHeight[first];
        let left = first;
        for(let i = first; i < second; i++){
            if(barHeight[i] < pivot){
                let temp = barHeight[left];
                barHeight[left++] = barHeight[i];
                barHeight[i] = temp;
            }
        }
        barHeight[left] = pivot;
        for(let j = first; j < second; j++){
            bars[j].style.height = barHeight[j] + "px";
        }
        return left;
    }

    QuickSort(first, second){
        if(first < second){
            let middle = this.Partitions(first, second);
            this.QuickSort(first, middle);
            this.QuickSort(middle + 1, second)
        }
    }
    //END OF SORTING ALGORITHMS
    //END OF SORTING ALGORITHMS
    //END OF SORTING ALGORITHMS

    //FUNCTIONS TO ENABLE AND DISABLE BUTTONS TO PREVENT MULTIPLE CLICKS AND INTERRUPTION
    disableButtons(){
        let something = document.getElementsByTagName("li");
        let temp = document.getElementsByClassName("new");
        temp[0].style.pointerEvents = 'none';
        for(let i = 0; i < something.length; i++){
            something[i].style.pointerEvents = 'none';
        }
    }
    enableButtons(){
        let something = document.getElementsByTagName("li");
        let temp = document.getElementsByClassName("new");
        temp[0].style.pointerEvents = 'auto';
        for(let i = 0; i < something.length; i++){
            something[i].style.pointerEvents = 'auto';
        }
    }
    SortHelper(sortNum, first, second){
        switch(sortNum){
            case 1:
                this.disableButtons();
                this.InsertionSort();
                this.enableButtons();
                break;
            case 2:
                this.disableButtons();
                this.SelectionSort();
                this.enableButtons();
                break;
            case 3:
                this.disableButtons();
                this.BubbleSort();
                this.enableButtons();
                break;
            case 4:
                this.disableButtons();
                this.MergeSort(first, second);
                this.enableButtons();
                break;
            case 5:
                this.disableButtons();
                this.QuickSort(first, second);
                this.enableButtons();
                break;
            default:
                break;
        }
       
    }

    //RENDERS THE STATE OF THE CONTAINER COMPONENT
    render() {
        bars = document.getElementsByClassName("bar");
        const {array} = this.state;
        

        return (
            <div>
            <div className = "controls">
                <h1>Sorting Visualizer</h1>
                <div className = "sort-list">
                <ul>
                    <li onClick = {() => this.SortHelper(1, 0, 0)}>Insertion Sort</li>
                    <li onClick = {() => this.SortHelper(2, 0, 0)}>Selection Sort</li>
                    <li onClick = {() => this.SortHelper(3, 0, 0)}>Bubble Sort</li>
                    <li onClick = {() => this.SortHelper(4, 0, numBars - 1)}>Merge Sort</li>
                    <li onClick = {() => this.SortHelper(5, 0, numBars)}>Quick Sort</li>
                </ul>
                </div>
            </div>
            <div className = "sorting-container">
                <div className = "bar-container">
                {array.map((value, index) => (
                    <div 
                    className = "bar" 
                    key = {index}
                    style = {{height: `${value}px`}}>
                    </div>
                ))}
                </div>
            </div>
            
            <div className = "slider-text">
                <b>Array Size</b>
            </div>
            <div className = "new" onClick = {() => this.generateArray()}><b>Generate New Array</b></div>
            <div className = "sliders">
            {/*<input type="range" min="10" max="70" value="40" className="slider" id="myRange"/>*/}
            </div>
            </div>  
        );          
    } 
}


