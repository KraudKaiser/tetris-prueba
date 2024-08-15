

const canvas = document.querySelector('canvas')

const context = canvas.getContext('2d')
const SCORE = document.querySelector('strong')
const BLOCK_SIZE = 35

const BOARD_WIDTH = 14

const BOARD_HEIGHT = 30

const audio = new window.Audio('./musica.mp3')

audio.volume = 0.4
audio.play()

let score = 0
canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
  ]

  const piece ={
    position:{x:3, y:6},
    shape:[[1,1],
            [1,1]]
}

  const pieces = [
    {
        position: {x:6, y:6},
        shape:[
            [1,1],
            [1,1]
        ]
      },
    {
        position:{x:3, y:6},
        shape:[
            [1, 1, 1, 1]
        ]
    },
    {
        position:{x:3, y:6},
        shape:[
            [1, 0, 0],
            [1, 1, 1]
        ]
    },
    {
        position:{x:3, y:6},
        shape:[
            [0, 0, 1],
            [1, 1, 1]
        ]
    },
    {
        position:{x:3, y:6},
        shape:[
                [0, 1, 1],
                [1, 1, 0]
            ]
    },
    {
        position:{x:3, y:6},
        shape:[
            [1, 1, 0],
            [0, 1, 1]
        ]
    }
  ]


function draw () {
  context.fillStyle = '#111'
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y) =>{
    row.forEach((value, x) =>{
        if(value === 1){
            context.fillStyle = 'yellow'
            context.fillRect(x,y,   1, 1)
        }
    })
  })

  piece.shape.forEach((row, y) =>{
    row.forEach((value, x) =>{
        if(value === 1){
            context.fillStyle = 'blue',
            context.fillRect(x + piece.position.x, y + piece.position.y, 1,1)
        }
    })
  })
}

document.addEventListener('keydown', (event) =>{
    if(event.key === 'ArrowLeft'){
        piece.position.x--
        checkColission() ? piece.position.x++ : piece.position.x
    } 
    if(event.key === 'ArrowRight'){
        piece.position.x++
        checkColission() ? piece.position.x-- : piece.position.x
    }
    if(event.key === 'ArrowDown'){
        piece.position.y++
        if(checkColission()){
            piece.position.y--
            solidifyPiece()
            removeRows()
        }
    } 

    if(event.key === "ArrowUp"){
        const rotated = []
        for(let row = 0; row < piece.shape[0].length; row++){
            const newRow = []

            for(let column = piece.shape.length - 1; column >= 0; column--){

                newRow.push(piece.shape[column][row])
            }
            rotated.push(newRow)
        }
        const previousRotated = piece.shape


        piece.shape = rotated

        if(checkColission()){
            piece.shape = previousRotated
        }
    }
})
function checkColission(){
    return piece.shape.find((row, y)=>{
        return row.find((value, x)=>{
            return (
                value != 0 &&
                board[y + piece.position.y]?.[x + piece.position.x] != 0
            )
        })
    })
}

function solidifyPiece(){
    piece.shape.forEach((row, y)=>{
        row.forEach((value, x) =>{
            if(value === 1){
                board[y+piece.position.y][x+piece.position.x] = 1                    
            }
        })
    })

    piece.shape = pieces[Math.floor(Math.random() * pieces.length)].shape
    piece.position.y=0
    piece.position.x = 0
    if(checkColission()){
        alert("Game over")
        board.forEach((row) => row.fill(0))
    }

    score += 10
}

function removeRows(){
    const rowsToRemove = []

    board.forEach((row, y)=>{
        if(row.every(value => value === 1)){
            rowsToRemove.push(y)
        }
    })

    rowsToRemove.forEach(y =>{
        board.splice(y, 1)
        const newRow = Array(BOARD_WIDTH).fill(0)
        board.unshift(newRow)
        score +=100
    })
}

let dropCounter = 0
let lastTime = 0
function updateDrop(time = 0){
    const deltaTime = time - lastTime
    lastTime = time
    SCORE.innerText = score
    dropCounter += deltaTime
    if(dropCounter > 1000){
        piece.position.y++
        dropCounter = 0
        if(checkColission()){
            piece.position.y--
            solidifyPiece()
            removeRows()
        }
    }
    draw()
    window.requestAnimationFrame(updateDrop)
}


updateDrop()
