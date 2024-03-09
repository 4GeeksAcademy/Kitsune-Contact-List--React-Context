const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contact: []
		},
		actions: {
			// // Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },
			// loadSomeData: () => {
			// 	/**
			// 		fetch().then().then(data => setStore({ "foo": data.bar }))
			// 	*/
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// },
			
			//<-----------------CONSTANTE PARA TRAER TODOS LOS CONTACTOS----------------------->
			LoadContact: () => {
				fetch ("https://playground.4geeks.com/apis/fake/contact/agenda/KitsuneDai")
				.then((response)=>response.json())
				.then ((data) => {
					setStore({ contact: data })
				})
				.catch((err)=>err)
			},


			//<-----------------CONSTANTE PARA AÑADIR CONTACTO----------------------->
			addContact : (contact) => {
				 
				console.log(contact);
				const newContactData = {
					full_name:contact.full_name,
					email: contact.email,
					phone: contact.phone,
					address: contact.address,
					agenda_slug: "KitsuneDai",
				};
			
				fetch("https://playground.4geeks.com/apis/fake/contact", {
					method: "POST",
					body: JSON.stringify(newContactData),
					headers: { "Content-Type": "application/json" },
				  })
					.then((response) => {
						if (!response.ok) throw Error(response.statusText);
						return response.json();
					  ;
					})
					.then((data) => {
					  console.log("POST->", data);
					  getActions().LoadContact()//RECARGA LA PÁGINA
					})
					.catch((err) => {console.log(err);
					});
				
			},
				

			//<-----------------CONSTANTE PARA EDITAR Y RECARGAR LA PÁGINA------------------------> 
			updateContact: (contact)=>{
				const requestOptions = {
				  method: "PUT",
				  body: JSON.stringify(contact),
				  headers: { "Content-Type": "application/json" },
				  redirect: "follow"
				};
				
				fetch(`https://playground.4geeks.com/apis/fake/contact/${contact.id}`, requestOptions)
				  .then((response) => response.text())
				  .then((result) => {
					fetch ("https://playground.4geeks.com/apis/fake/contact/agenda/KitsuneDai")
						  .then((response)=>response.json())
						  .then ((data) => setStore({ contact: data }))
				  })
				  .catch((error) => console.error(error));
			},
   
			//<-----------------CONSTANTE PARA BORRAR CONTACTO Y RECARGAR LA PÁGINA----------------------->
			deleteContact: (indexDelete) => {
				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				  };
				  fetch("https://playground.4geeks.com/apis/fake/contact/" + indexDelete, requestOptions)
				  .then((response) => response.text())
				  .then((result) => {
					  //PARA RECARGAR LA LISTA UNA VEZ SE ELIMINE LA PERSONA QUE QUEREMOS
					  fetch ("https://playground.4geeks.com/apis/fake/contact/agenda/KitsuneDai")
						  .then((response)=>response.json())
						  .then ((data) => setStore({ contact: data }))
					  })
				  .catch((error) => console.error(error));

					
		  }
		}
	};
};

export default getState;
