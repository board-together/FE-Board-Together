//https://api.boardgameatlas.com/api/search?ids=TAAifFP590&client_id=JLBr5npPhV

export const fetchSearchedGames = (term) => {
  return fetch(`https://api.boardgameatlas.com/api/search?name=${term}&client_id=JLBr5npPhV`)
  .then(response => response.json())
}