import React from "react"

const ingredientContext = React.createContext({
    addIng: () => { },
    removeIng: () => { },
    ingredients: {}
})

export default ingredientContext