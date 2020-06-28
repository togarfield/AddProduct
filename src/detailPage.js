import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';

class detailPage extends Component {
    constructor(props) {
        super(props)
    }

    _renderItem =({item}) => {
        return(
            <View style={styles.title}>
                <Text>{item.title}</Text>
                <View style={styles.barang}>
                    <Text>Jumlah Barang : </Text>
                    <Text>{item.barang}</Text>
                </View>
            </View>
        )
    }
    render() {
        let {route} = this.props
        let {container} = styles
        return (
            <View style = {container}>
                <Text style={{alignSelf: 'center', fontSize: 20, marginBottom: 30}}>Total Barang : {route.params.totalBarang}</Text>
                <FlatList
                    data={route.params.newCheckoutProduct}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom: 10}}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => this.onBack()}>
                        <Text style={{color: 'white'}}>Kembali</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buyButton}
                        onPress={() => this.onBuy()}>
                        <Text style={{color: 'white'}}>Beli</Text>
                    </TouchableOpacity>
                </View>
          </View>
        )
    }
 
    onBack = () => {
        this.props.navigation.goBack()
    }

    onBuy = () => {
        this.props.route.params.onReturn({ isBuy: true})
        this.props.navigation.goBack()
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
    title: {
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center'
    },
    barang: {
      flexDirection: 'row', 
      flex: 1, 
      justifyContent: 'space-between',
      marginTop: 10
    },
    backButton: {
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#7d8280',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width: 100,
        alignItems: 'center'
    },
    buyButton: {
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#13d620',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width: 100,
        alignItems: 'center'
    }
  })

export default detailPage;