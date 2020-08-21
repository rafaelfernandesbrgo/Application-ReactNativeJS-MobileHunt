import React from 'react'
import { WebView } from 'react-native-webview';



const Product = ({ navigation }) => { 
    
return(
 <WebView
        source={{ uri: navigation.state.params.product.url }}
        style={{ marginTop: 20 }}
    />
)}


export default Product;

