import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import api from '../services/api'

export default class Main extends Component {

    state = {
        products: [],
        page: 1,
        productInfo: []    
    }

 
    componentDidMount() {
        this.loadProducts()
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`)
        const { docs, ...productInfo } = response.data
        this.setState({ products: [...this.state.products, ...docs], productInfo, page })   // spread operator to join the current vector with the new data
    }


    loadMore = () => {
        const { page, productInfo } = this.state

        if (page === productInfo.pages) return  //if at the end, stop flow

        const pageNumber = page + 1
        this.loadProducts(pageNumber)
    }



    

    renderItem = ({ item }) => (
        <View style={Styles.productContainer}>
            <Text style={Styles.productTitle}>{item.title}</Text>
            <Text style={Styles.productDescription}>{item.description}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Product', { product: item})} style={Styles.productButton}  >
                <Text style={Styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>

        </View>
    )


    render() {
        return (
            <>
                <View style={Styles.header}>
                    <Text  style={Styles.headerText}>Hunt</Text>
                </View>
                <View style={Styles.container}>
                    <FlatList
                        contentContainerStyle={Styles.list}
                        data={this.state.products}
                        keyExtractor={item => item._id}
                        renderItem={this.renderItem}
                        onEndReached={this.loadMore}
                        onEndReachedThreshold={0.1} //if 90% scrooled, calls the function
                    />
                </View>
            </>
        )
    }
}

const Styles = StyleSheet.create({
    header:{    
        backgroundColor: '#da552f',
        height:60,
        paddingTop:30
,
    },
    headerText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 10
      
    },

    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    list: {
        padding: 20
    },
    productContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 20,
        marginBottom: 20
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    productDescription: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24,
    },
    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#da552f',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    productButtonText: {
        fontSize: 16,
        color: '#da552f',
        fontWeight: 'bold'


    }


})