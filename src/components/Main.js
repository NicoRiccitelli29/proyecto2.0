import Tarjeta from './Tarjetas';
import React, {Component} from "react";
//Importamos tarjeta y react con el componente


class Main extends Component{
    constructor(){
        super();
        this.state={
            items: [],
            itemsNuevos:0,
            contador:0,
            value: ""
           
        }
    }

    componentDidMount(){ //Se ejecuta cada vez que se produce un cambio de estado
        this.resetDefault();
       
     }

     resetDefault(){
         fetch('https://randomuser.me/api/?page=1&results=20') 
        .then(result=>result.json())
        .then(data=>{
            this.setState({items: data.results, contador : 0});
            console.log(data.results);
        })
     }

     Borrar(idTarjeta){
        let resultado = this.state.items.filter((item)=>{
             return item.login.uuid !== idTarjeta
         })
         this.setState({contador: this.state.contador +1 ,items: resultado})
         console.log("Tarjeta a borrar: "+ idTarjeta);
         
         
 }
   agregarTarjetas(){
       console.log(this.state.cantidadItemsNuevos)
      fetch('https://randomuser.me/api/?results=' + this.state.cantidadItemsNuevos)
       .then(result=>result.json())
       .then(data=>{
               data.results.map((resultado)=>{ //.map() recorre el array y devuelve un array nuevo modificado
                return  this.state.items.push(resultado)
            })
            this.setState({items: this.state.items});
               console.log(data.results);
        })
    }
    filtrarTarjetas(nombreBuscado){
        let filtroTarjetas = document.querySelector("#filtro").value.toUpperCase()
        console.log(filtroTarjetas);
        let buscar = this.state.items.filter((busqueda)=>{
           let nombre = busqueda.name.first.toUpperCase()
           let apellido = busqueda.name.last.toUpperCase()
           return nombre.startsWith(filtroTarjetas) || apellido.startsWith(filtroTarjetas) 
           
        })
        this.setState({
            items : buscar
        }
        
        )

      
    }

    filtrarPorEdad(edadBuscada){
        let filtroTarjetas = document.querySelector("#filtro2").value.toUpperCase()
        console.log(filtroTarjetas);
        let buscar = this.state.items.filter((busqueda)=>{
           let edad = busqueda.dob.age.toString() 
           return edad.includes(filtroTarjetas)
        })
        this.setState({
            items : buscar
        }
        )

      
    }

    ordenarTarjetas(event){
        let inputValue = event.target.value
        console.log(inputValue)
        
        let ordenarTarjetas
        if (inputValue === "AscNombre" ){
            ordenarTarjetas = this.state.items.sort((a,b)=>{
                if(a.name.first > b.name.first) {
                    return 1;
                } 
                else if(a.name.first < b.name.first){
                    return -1;
                }
                else{
                    return 0;
                }
            })  
        }
        else if (inputValue === "DesNombre" ){
                ordenarTarjetas = this.state.items.sort((a,b)=>{
                    if(a.name.first < b.name.first) {
                        return 1;
                    } 
                    else if(a.name.first > b.name.first){
                        return -1;
                    }
                    else{
                        return 0;
                    }
                })
        }
        else if (inputValue === "AscApellido" ){
                ordenarTarjetas = this.state.items.sort((a,b)=>{
                    if(a.name.last > b.name.last) {
                        return 1;
                    } 
                    else if(a.name.last < b.name.last){
                        return -1;
                    }
                    else{
                        return 0;
                    }
                })
        }
        else if (inputValue === "DesApellido" ){
            ordenarTarjetas = this.state.items.sort((a,b)=>{
                if(a.name.last < b.name.last) {
                    return 1;
                } 
                else if(a.name.last > b.name.last){
                    return -1;
                }
                else{
                    return 0;
                }
            })
        }
        else if (inputValue === "AscEdad" ){
            ordenarTarjetas = this.state.items.sort((a,b)=>{
                if(a.dob.age > b.dob.age) {
                    return 1;
                } 
                else if(a.dob.age < b.dob.age){
                    return -1;
                }
                else{
                    return 0;
                }
            })
      }
      else if (inputValue === "DesEdad" ){
        ordenarTarjetas = this.state.items.sort((a,b)=>{
            if(a.dob.age < b.dob.age) {
                return 1;
            } 
            else if(a.dob.age > b.dob.age){
                return -1;
            }
            else{
                return 0;
            }
        })
  }
      this.setState({items: ordenarTarjetas})

    }

    //  console.log(this.state.nombreBuscado);
        //let busquedaNombre = this.state.items.filter((item)=>{
          //  return item.name.first === nombreBuscado
        //})
        //this.setState({items: busquedaNombre})

    render(){
        return(
            <div>
                <div class="row justify-content-center" id="inputRow">
                    <div class="col-md-auto">
                        <input type="number" min="1" onChange={(event) => this.setState({cantidadItemsNuevos: event.target.value})}  class="form-control" id="inputUsuario" placeholder="Ingrese un número"></input>
                    </div>
                </div>    

                <div class="row justify-content-center">
                    <div class="col-md-auto">
                        <button  onClick={this.agregarTarjetas.bind(this)} class="btn btn-warning" type="button" id="button-addon2">Añadir usuarios</button>
                    </div>
                </div>
            <div>
                <div class="row justify-content-center">
                    <div class="col-md-auto" id="rowButton">
                    <button className="botonReset" onClick={this.resetDefault.bind(this)}> <b>Reset</b></button>
                    <div className= "contador">Tajetas eliminadas : {this.state.contador}</div>
                    </div>
                </div>
            </div>
               


            <br/>
            
            
            <div class="row">
            <div class="col align-self-center">
                <div>Ordenar tarjetas</div>
                <select class="ordenar" onChange = {this.ordenarTarjetas.bind(this)} >
                    <option disabled selected>Ordenar por</option>
                    <option value="AscNombre" onClick={(event)=> this.setState({ value: event.target.value})}>Ascendente por nombre</option>
                    <option value="DesNombre" onClick={(event)=> this.setState({ value: event.target.value})}>Descendente por nombre</option>
                    <option value="AscApellido" onClick={(event)=> this.setState({ value: event.target.value})}>Ascendente por apellido</option>
                    <option value="DesApellido" onClick={(event)=> this.setState({ value: event.target.value})}>Descendente por apellido</option>
                    <option value="AscEdad" onClick={(event)=> this.setState({ value: event.target.value})}>Ascendente por edad</option>
                    <option value="DesEdad" onClick={(event)=> this.setState({ value: event.target.value})}>Descendente por edad</option>
                </select>
            </div>
                <div class="input-group input-group-sm mb-3">
                    
                    <input onChange={this.filtrarTarjetas.bind(this)} class="form-control" id="filtro" placeholder="Filtrar por nombre" aria-label="Nombre a buscar..." aria-describedby="button-addon3"></input>
                    <button  onClick={this.filtrarTarjetas.bind(this)} class="btn btn-info" type="button" id="button-addon3">Filtrar</button>
                </div>

                <div class="input-group input-group-sm mb-3">
                    
                    <input onChange={this.filtrarPorEdad.bind(this)} class="form-control" id="filtro2" placeholder="Filtrar por edad" aria-label="Nombre a buscar..." aria-describedby="button-addon4"></input>
                    <button  onClick={this.filtrarPorEdad.bind(this)} class="btn btn-danger" type="button" id="button-addon4">Filtrar</button>
                </div>


             
            </div>






            <div class="row row-cols-1 row-cols-md-3 g-4" id="contenedorTarjeta">

            
               
             {
                 
                 this.state.items.map((persona, idx)=>{
                     return(
                       <Tarjeta key={idx} info={persona} borrar={this.Borrar.bind(this)}/>)
                     })
             }
                 
     
             </div> 
             </div>
         )
     };
}

export default Main

