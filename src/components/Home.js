import axios from 'axios';
import React, { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const Home = () => {

    const [items, setItems] = useState([]);
    const [wikiPage, setWikiPage] = useState(null);
    const [message, setMessage] = useState('');

    const handleOnSearch = async (inputString, results) => {
        if (inputString && inputString.length && inputString.length) {
            const res = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${inputString}&namespace=0&limit=5&origin=*`);
            if (res.status === 200 && res.data && res.data.length && res.data[1]) {
                if (res.data[1].length) {
                    setItems(res.data[1].map((value, index) => {
                        return { id: index, name: value, pageUrl: res.data[3].length && res.data[3][index] ? res.data[3][index] : null }
                    }));
                } else {
                    setItems([]);
                }
            } else {
                setItems([]);
            }
        } else {
            setWikiPage(null);
            setItems([]);
        }
    }

    const handleOnSelect = async (item) => {
        setWikiPage(item.pageUrl);
        const result = await axios.post("insights", {
            itemName: item.name,
            itemUrl: item.pageUrl
        }).catch(err => console.error(err));
        if (result.status === 201 && result.data) {
            setMessage('Record Saved Successfully!');
            setTimeout(() => {
                setMessage('');
            }, 2000)
        }
    }

    const formatResult = (item) =>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>

    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: 400 }}>Search Keyword Here
                    <ReactSearchAutocomplete
                        inputDebounce={10}
                        items={items}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        autoFocus
                        formatResult={formatResult}
                    />
                </div>
            </header>
            {
                wikiPage
                    ?
                    <>
                        <br />
                        <a href={wikiPage} target="_blank">{`Visit Wiki Page - ${wikiPage}`}</a>
                    </>
                    : ''
            }
            {<>
                <br />
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h6 style={{ color: 'green' }}><b>{message}</b></h6>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default Home;