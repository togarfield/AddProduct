import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator, ToastAndroid } from 'react-native';

class ListItem extends Component {
    render () {
      const { item } = this.props;
      return (
        <View>
          <Text style={{alignSelf: 'center'}}>{item.title}</Text>
          <View style={styles.barang}>
            <Button title="Kurang" onPress={this.props.onSubtract}/>
            <Text>{item.barang}</Text>
            <Button title="Tambah" onPress={this.props.onAdd}/>
          </View>
        </View>
      )
    }
  }
  
  class listProduct extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: true,
        dataSource: [],
        isBuy: false,
      }
    }
  
    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson = responseJson.map(item => {
          item.barang = 0;
          return item
        })
        this.setState({
          isLoading: false,
          dataSource: responseJson
        })
      })
    }

    onReturn = data => {
        this.setState({dataSource : this.state.dataSource.map(item => {item.barang = 0; return item})})
    }
  
    render() {
      let { container } = styles
      let { dataSource, isLoading } = this.state
      let totalBarang = 0;
      dataSource.forEach((item) => {
        totalBarang += item.barang
      })
      if (isLoading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" animating/>
          </View>
        )
      } else {
        return(
          <View style = {container}>
            <View style={{ flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{alignSelf: 'flex-start'}}>Total Barang : {totalBarang}</Text>
              <Button title="Checkout" onPress={() => this.onCheckout(totalBarang)}/>
            </View>
            <FlatList
              data={dataSource}
              renderItem={({item, index}) => (
                <ListItem
                  item={item}
                  onSubtract={() => this.onSubtract(item, index)}
                  onAdd={() => this.onAdd(item, index)}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              />
          </View>
        )
      }
    }
  
    
    onSubtract = (item, index) => {
      const product = [...this.state.dataSource];
      if (product[index].barang < 0) {
        product[index].barang -= 1;
        this.setState({ dataSource : product })
      }
    }
  
    onAdd = (item, index) => {
      const product = [...this.state.dataSource];
      product[index].barang += 1;
      this.setState({ dataSource : product })
    }
  
    onCheckout = (totalBarang) => {
        if (totalBarang > 0 ) {
            const product = [...this.state.dataSource];
            const newCheckoutProduct = product.filter( item => item.barang > 0)
            this.props.navigation.navigate('detailPage', {newCheckoutProduct, totalBarang, onReturn : this.onReturn})
        } else {
            ToastAndroid.showWithGravity(
                "Masukan minimal 1 barang",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
        }
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
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
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: 10,
      padding: 10
    }
  })
  
  export default listProduct;