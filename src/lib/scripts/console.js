function customLog(message, color='black') {
  switch (color) {
    case 'success':  
      color = 'Green'
      break
    case 'info':     
      color = 'Blue'  
      break;
    case 'error':   
      color = 'Red'   
      break;
    case 'warning':  
      color = 'Orange' 
      break;
    default: 
      color = color
  }

  console.log(`%c${message}`, `color:${color}`)
}

customLog('Hello World!')
customLog('Success!', 'success')
customLog('Error!', 'error')
customLog('Warning!', 'warning')
customLog('Info...', 'info')