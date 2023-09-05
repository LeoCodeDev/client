import React from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { SearchBar } from '../Components/SearchBar/SearchBar'
import { Buttons } from '../Components/Buttons/Buttons'
import { Cards } from '../Components/Cards/Cards'

const Home = () => {
  return (
    <>
    <Navbar/>
    <SearchBar/>
    <Buttons/>
    <Cards/>
    </>
  )
}

export {Home}
