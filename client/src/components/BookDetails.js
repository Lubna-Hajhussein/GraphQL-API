import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import {getBookQuery} from "./../queries/queries"
import openBook from "./../images/open-book.png"

class BookDetails extends Component {
    displayBookDetails(){
        const { book } = this.props.data;
        if(book){
            return(
                <div>

                     <h2 
                     style={{
                         position:"absolute",
                         left:"30%"
                     }}
                     >{ book.name }</h2>
                    <img src={openBook} style={{
                        width:"290px",
                        height:"200px",
                        position:"absolute",
                        left:"21%",
                        top:"30%"
                    }} />
                  <p
                  style={{
                    position:"absolute",
                    left:"30%",
                    top:"37%"
                }}
                  >Genre:</p>
                    <p
                    style={{
                        position:"absolute",
                        left:"49%",
                        top:"37%"
                    }}
                    >{ book.genre }</p>
                    <p
                    style={{
                        position:"absolute",
                        left:"30%",
                        top:"47%"
                    }}
                    >Author:</p>
                    <p
                    style={{
                        position:"absolute",
                        left:"49%",
                        top:"47%"
                    }}
                    >{ book.author.name }</p>
                </div>
            );
        } else {
            return( <div></div> );
        }
    }
    render(){
        return(
            <div id="book-details">
                { this.displayBookDetails() }
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);