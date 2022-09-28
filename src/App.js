import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import {GoLocation} from 'react-icons/go'
import './styles.css'

import api from './services/api'

export default function App() {
	
	const [input, setInput] = useState('')
	const [cep, setCep] = useState({})
	const regex =  /^[0-9]{5}-[0-9]{3}$/

	const verification = (response) => {
		if (Object.keys(response.data).length === 1) {
			alert(`O Cep "${input.valueOf()}" não foi encontrado.\n Tente novamente ou busque outro CEP.`);
		}
	}

	const handleSearch = async (e) => {
		e.preventDefault()

		try {
			
			if (input === '') {
				alert('Preencha o campo com algum CEP!')
			}
			
			const response = await api.get(`${input}/json`)	
			setCep(response.data)
			verification(response)
			setInput('')	
		}
		catch {
			if (input.match(regex) !== regex) {
				alert("Coloque um CEP válido.")
			}
			setInput('')
		}
	}	
	
	return (
		<div className="container">
			<h1 className="title">buscador de cep</h1>

			<div className="container--input">
			<form>
				<input
					className="input--field" 
					type="text" 
					placeholder="digite seu cep..."
					value = {input}
					onChange = {(event) => setInput(event.target.value)}
				/>
				
				<button className="button--search" onClick={handleSearch} type="submit">
					<FiSearch size={25} color="white"/>
				</button>
			</form>
			</div>
			
			{Object.keys(cep).length > 1 && (
				<main className="main">
					<h2><GoLocation size={30} color="5e0035"/> CEP: {cep.cep}</h2>

					<span>Logradouro: {cep.logradouro}</span>
					<span>Complemento: {`${cep.complemento ? cep.complemento : '(Não informado)'}`}</span>
					<span>Bairro: {cep.bairro}</span>
					<span>Localidade: {cep.localidade} - {cep.uf}</span>

				</main>
			)}			
		</div>
	)
}