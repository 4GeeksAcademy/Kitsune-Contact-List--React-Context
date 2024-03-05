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
			contact: [
				//CONTACTOS PARA COPIAR EN EL API
					// { 
					//   "full_name": "Hyoga Cygnus",
					//   "email": "hyogacygnus@gmail.com",
					//   "agenda_slug": "KitsuneDai",
					//   "address":"Terney, Primorsky Krai, Rusia, 692150",
					//   "phone":"(+7) 902 055-11-21"
					// },
					// { 
					//   "full_name": "Shiryu Dragon",
					//   "email": "shiryudragon@gmail.com",
					//   "agenda_slug": "KitsuneDai",
					//   "address":"58 Tv. dos Currais, Macao",
					//   "phone":"(+853)2883-7055"
					// },       
					// { 
					//   "full_name": "Shun Andromeda",
					//   "email": "shunandro@gmail.com",
					//   "agenda_slug": "KitsuneDai",
					//   "address":"1 Kamitoba, Kyoto, 601-8127, Japón",
					//   "phone":"(+81)325-433-757"
					// },        
					// { 
					//   "full_name": "Ikki Phoenix",
					//   "email": "ikkiphoenix@gmail.com",
					//   "agenda_slug": "KitsuneDai",
					//   "address":"1 Kamitoba, Kyoto, 601-8127, Japón",
					//   "phone":"(+81)570-017-311"
					// },
					 
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			
			//<-----------------CONSTANTE PARA TRAER TODOS LOS CONTACTOS----------------------->
			LoadContact: () => {
				fetch ("https://playground.4geeks.com/apis/fake/contact/agenda/KitsuneDai")
				.then((response)=>response.json())
				.then ((data) => setStore({ contact: data }))
				.catch((err)=>err)
			},


			//<-----------------CONSTANTE PARA AÑADIR CONTACTO----------------------->
			addContact : (contact) => {
				const store = getStore();
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
					  getActions().LoadContact() // RECARGA LA PÁGINA
					})
					.catch((err) => {console.log(err);
					});
				
			},
				

			//<-----------------CONSTANTE AÚN POR DEFINIR----------------------->
			updateContact: (updatedContact) => {
                // Obtener el store actual
                const store = getStore();

                // Buscar el índice del contacto que coincide con el ID del contacto actualizado
                const index = store.contact.findIndex(contact => contact.id === updatedContact.id);

                // Si se encuentra el contacto
                if (index !== -1) {
                    // Crear una nueva lista de contactos con el contacto actualizado en el índice correspondiente
                    const updatedContacts = [
                        ...store.contact.slice(0, index),
                        updatedContact,
                        ...store.contact.slice(index + 1)
                    ];

                    // Actualizar el store con la lista de contactos actualizada
                    setStore({ contact: updatedContacts });
                } else {
                    console.error("No se encontró el contacto para actualizar");
                }
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
