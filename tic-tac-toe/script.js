console.log("TicTacToe.js connected")

cells = document.querySelectorAll('td')
restart = document.querySelector('#Restart');

// Clear Squares
restart.addEventListener('click',function(){
  for (var i = 0; i < cells.length; i++) {
      cells[i].textContent = '';
  }
})

// Click event
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function(){
      if (this.textContent == "X") {
        this.textContent = "O";
      } else if (this.textContent == "O") {
        this.textContent = ""
      } else {
        this.textContent = "X"
      }
    }
  )
}
