import react, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";

import Picker from "./src/components/Picker";
import api from "./src/services/api";

export default function App() {

  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true)

  const [moedaSelecionada, setMoedaSelecionada] = useState(null)
  const [moedaBvalor, setMoedaBvalor] = useState(0)

  useEffect( () => {
    async function loadMoedas() {
      const response = await api.get('all');
      
      let arrayMoedas = []
      Object.keys(response.data).map( ( k ) => {
          arrayMoedas.push({
            key: k,
            label: k,
            value: k
          })
      })

      setMoedas(arrayMoedas);
      setLoading(false)
      
    }

    loadMoedas()
  }, [])


  if (loading) {
    return(
      <View style={[styles.container, {justifyContent: 'center'}]}>
      <ActivityIndicator 
      color='#FFF'
      size={48}
      />
    </View>
    )
  } 
  else {
    return (
      <View style={styles.container}>
  
        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Slecione sua Moeda</Text>
          <Picker  moedas={moedas}/>
        </View>
  
        <View style={styles.areaValor}>
          <Text style={styles.titulo}> Digite um valor para converter em R$</Text>
          <TextInput 
          style={styles.input} 
          placeholder="EX: 23" 
          keyboardType="numeric"
          onChange={ (valor) => setMoedaBvalor(valor) }
          />
        </View>
  
        <TouchableOpacity style={styles.areaBtn}>
          <Text style={styles.textoBtn}>Converter</Text>
        </TouchableOpacity>
  
        <View style={styles.areaResultado}>
  
          <Text style={styles.valorConvertido}>
          3 USD
          </Text>
          <Text style={[styles.valorConvertido, {fontSize: 16, fontWeight: 400, margin: 12}]}>
            Corresponde a
          </Text>
          <Text style={styles.valorConvertido}>
            20,09
          </Text>
  
        </View>
  
      </View>
    );
  }


  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2d2d2d",
    paddingTop: 40,
  },
  areaMoeda: {
    width: '90%',
    backgroundColor: '#F9f9f9',
    paddingTop: 9,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 1

  },
  titulo: {
    color: '#000',
    paddingTop: 4,
    paddingLeft: 8
  },
  areaValor: {
    width: '90%',
    backgroundColor: '#F9f9f9',
    paddingBottom: 8,
    paddingTop: 8
  },
  input: {
    width:'100%',
    padding: 10,
    height: 48,
    fontSize: 20,
    marginTop: 8,
    color: '#000'
  },
  areaBtn: {
    width: '90%',
    backgroundColor: '#FB4B57',
    height: 48,
    borderBottomLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  textoBtn: {
    fontSize: 18,
    fontWeight: '500'
  },
  areaResultado: {
    width: '90%',
    backgroundColor: '#F9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  valorConvertido: {
    fontSize: 24,
    fontWeight: '500',

  }
  
});
