import React, { Component } from 'react'
import sendRequest from './request';
import './styles/App.css';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      mydata: null,
      html: null,
    }
  }
  componentDidMount() {
    const query = `
    query{
      products(
        search:null
        sort:{ position: ASC }
        currentPage: 1
        pageSize: 1
        filter: {
          custom_filter:[{attribute: "entity_id",condition:{eq: "1958"}}]      
        }
      )
    
      {
        items{
          name
        sku
          breadcrumbs{
            category_name
          }
          
          price{
            minimalPrice{
              amount{
                currency
                value
              }
            }
            regularPrice{
              amount{
                currency
                value
              }
            }
          }
          media_gallery_entries{
            media_type
            id
            thumbnail{
              url
            }
          }
          description{
            html
          }
          image{
            url
          }
         meta_description
         related_products{
          name
          media_gallery{
            url
          }
          image{
            url
          }
          
          
          special_price
           price{
        maximalPrice{
          amount{
            value
          }
        }
          regularPrice{
            amount{
              value
            currency
            }
          }  
           minimalPrice{
            amount{
              value
              
              
            }
          }
            
       
      }
        
        }
      }
        
      }
    }
    `
    sendRequest({
      query,
      variables: { url: "men.html" }
    }).then(res => {
      console.log(res);
      this.setState({
        data: res,
        mydata: JSON.stringify(res.data)

      })
    })
  }

  render() {
    console.log(this.state)
    console.log(">>")
    // console.log(this.state.mydata.products[0].items[0].media_gallery_entries[0].id)
    return (
      <div className="App">
        <h1>React and Graphql</h1>
        <p>Sample response</p>
        {
          !this.state.data ? (
            <p>Loading....</p>
          ) : (<>
            <div>
              {this.state.data.data.products.items[0].name}<br />
              {this.state.data.data.products.items[0].sku}<br />

              {this.state.data.data.products.items[0].price.minimalPrice.amount.value}<br />
              {this.state.data.data.products.items[0].price.regularPrice.amount.value}


            </div>

            <div className="fku1" dangerouslySetInnerHTML={{ __html: this.state.data.data.products.items[0].description.html }} />


            {/* <div>
              <img src=
                {this.state.data.data.products.items[0].image.url} />
              <span>
                {this.state.data.data.products.items[0].media_gallery_entries[0].id}
                <img src={this.state.data.data.products.items[0].media_gallery_entries[0].thumbnail.url} />
              </span>
            </div> */}
            <div>
              {this.state.data.data.products.items[0].media_gallery_entries.map((i, val) => {
                return (
                  <>
                    <span key={val}>
                      {i.id}
                    </span>
                    <img src={i.thumbnail.url} />
                  </>
                )
              })}
            </div>
            {/* <div >
              <input list="cur" id="" name="" className="currency_input" />
              <datalist id="cur">
                <default value=""></default>
                <option value={this.state.mydata[0]}></option>
                <option value={this.state.mydata[1]}></option>
              </datalist>
            </div> */}
          </>
          )
        }
      </div>
    );
  }
}
