import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/SupplierWiki.css';

const SupplierWiki = () => {
    const { authData } = useAuth();
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [productOptions, setProductOptions] = useState([]);

    const [minMaxBet, setMinMaxBet] = useState('');
    const [languages, setLanguages] = useState('');
    const [pacgorLicense, setPacgorLicense] = useState(false);
    const [newLicenses, setNewLicenses] = useState('');
    const [clientAreaURL, setClientAreaURL] = useState('');
    const [marketingAssetsURL, setMarketingAssetsURL] = useState('');
    const [gameCertificatesURL, setGameCertificatesURL] = useState('');
    const [topMarkets, setTopMarkets] = useState('');
    const [directCommunication, setDirectCommunication] = useState(false);
    const [popularGames, setPopularGames] = useState('');
    const [offeredCurrencies, setOfferedCurrencies] = useState('');
    const [maxExposure, setMaxExposure] = useState('');
    const [supportsBlueDollar, setSupportsBlueDollar] = useState(false);
    const [comments, setComments] = useState('');
    const [file, setFile] = useState(null);


    useEffect(() => {
        // Initialize selectedSupplier and productOptions based on authData
        if (authData && Array.isArray(authData.supplierData) && authData.supplierData.length > 0) {
            const userSupplierData = authData.supplierData[0];
            setSelectedSupplier(userSupplierData.supplier);
            setProductOptions(userSupplierData.product);
            
            // // Prefill form if supplierWikiData exists
            // if (userSupplierData.supplierWikiData) {
            //     setMinMaxBet(userSupplierData.supplierWikiData.Min_Max_bet__c || '');
            //     setLanguages(userSupplierData.supplierWikiData.Language__c || '');
            //     setPacgorLicense(userSupplierData.supplierWikiData.PACGOR_license__c || false);
            //     setNewLicenses(userSupplierData.supplierWikiData.new_license__c || '');
            //     setClientAreaURL(userSupplierData.supplierWikiData.Client_Area_URL__c || '');
            //     setMarketingAssetsURL(userSupplierData.supplierWikiData.Marketing_Material__c || '');
            //     setGameCertificatesURL(userSupplierData.supplierWikiData.URL_for_game_certificate__c || '');
            //     setTopMarkets(userSupplierData.supplierWikiData.Top_5_market__c || '');
            //     setDirectCommunication(userSupplierData.supplierWikiData.Direct_communication_with_Hub88__c || false);
            //     setPopularGames(userSupplierData.supplierWikiData.top_5_games__c || '');
            //     setOfferedCurrencies(userSupplierData.supplierWikiData.Supported_Currencies__c || '');
            //     setMaxExposure(userSupplierData.supplierWikiData.Max_Exposure__c || '');
            //     setSupportsBlueDollar(userSupplierData.supplierWikiData.Blue_Dollar_Supported__c || false);
            //     setComments(userSupplierData.supplierWikiData.Comments__c || '');
            //     // setFile(userSupplierData.supplierWikiData.Attached_File__c || null); // File handling might be different
            // }
            
            
            // If there is supplierWikiData, prefill the form with the first matching record
            if (userSupplierData.supplierWikiData && userSupplierData.supplierWikiData.length > 0) {
                prefillForm(userSupplierData.supplierWikiData, userSupplierData.product[0]);
            }
        }
    }, [authData]);

    useEffect(() => {
        // Update the form when a new product is selected
        if (authData && authData.supplierData && authData.supplierData[0].supplierWikiData) {
            prefillForm(authData.supplierData[0].supplierWikiData, selectedProduct);
        }
    }, [selectedProduct, authData]);


    const prefillForm = (wikiData, product) => {
        // const record = wikiData.find(data => data.Product__c === product);
        const record = wikiData.find(data => data.Supplier_Products__r && data.Supplier_Products__r.Name === product);
        if (record) {
            setMinMaxBet(record.Min_Max_bet__c || '');
            setLanguages(record.Language__c || '');
            setPacgorLicense(record.PACGOR_license__c || false);
            setNewLicenses(record.new_license__c || '');
            setClientAreaURL(record.Client_Area_URL__c || '');
            setMarketingAssetsURL(record.Marketing_Material__c || '');
            setGameCertificatesURL(record.URL_for_game_certificate__c || '');
            setTopMarkets(record.Top_5_market__c || '');
            setDirectCommunication(record.Direct_communication_with_Hub88__c || false);
            setPopularGames(record.top_5_games__c || '');
            setOfferedCurrencies(record.Supported_Currencies__c || '');
            setMaxExposure(record.Max_Exposure__c || '');
            setSupportsBlueDollar(record.Blue_Dollar_Supported__c || false);
            setComments(record.Comments__c || '');
        
        } else {
            // Reset form fields or set default values if no matching record is found
            setMinMaxBet('');
            setLanguages('');
            setPacgorLicense('');
            setNewLicenses('');
            setClientAreaURL('');
            setMarketingAssetsURL('');
            setGameCertificatesURL('');
            setTopMarkets('');
            setDirectCommunication('');
            setPopularGames('');
            setOfferedCurrencies('');
            setMaxExposure('');
            setSupportsBlueDollar('');
            setComments('');
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create a FormData object to handle form data
        const formData = new FormData();
        formData.append('supplier', selectedSupplier);
        formData.append('product', selectedProduct);
        // Append other form fields as needed
        formData.append('accountID', authData.accountID); // Include the AccountID
    
        // Example POST request to your backend
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/form`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${authData.token}`, // Assuming you're using a bearer token for authorization
                },
            });
            if (response.ok) {
                // Handle success
            } else {
                // Handle errors
            }
        } catch (error) {
            // Handle network errors
        }
    };
    


    return (
        <div className="form-container">
            <h1 className="form-header">{selectedSupplier} - Supplier Wiki</h1>
            <form onSubmit={handleSubmit} className="supplier-form">
            <div className="form-section">    
                <div className="form-group">
                <label className="form-label">
                    Supplier:
                    <select className="form-select" value={selectedSupplier} onChange={e => setSelectedSupplier(e.target.value)}>
                        <option key={selectedSupplier} value={selectedSupplier}>
                            {selectedSupplier}
                        </option>
                    </select>
                </label>
                </div>

                <div className="form-group">
                <label className="form-label">
                    Product:
                    <select className="form-select" value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
                        {productOptions.map(product => (
                            <option key={product} value={product}>
                                {product}
                            </option>
                        ))}
                    </select>
                </label>
                </div>
            </div>

            <div className="form-section">
                <div className="form-group">
                <label className="form-label">
                    Average Min/Max Bet:
                    <div></div><em>test</em>
                    <input className="form-control" type="text" value={minMaxBet} onChange={e => setMinMaxBet(e.target.value)} />
                </label>
                </div>

                <div className="form-group">                
                <label className="form-label">
                    Languages Offered:
                    <input className="form-control" type="text" value={languages} onChange={e => setLanguages(e.target.value)} />
                </label>
                </div>

                <div className="form-group form-group-checkbox">    
                <label className="form-label-checkbox">
                    PACGOR License:
                    <input className="form-checkbox" type="checkbox" checked={pacgorLicense} onChange={e => setPacgorLicense(e.target.checked)} />
                </label>
                </div>
            </div>

            <div className="form-section">
                <div className="form-group">    
                <label className="form-label">
                    Plan on Acquiring New Licenses:
                    <input className="form-control" type="text" value={newLicenses} onChange={e => setNewLicenses(e.target.value)} />
                </label>
                </div>

                <div className="form-group">                
                <label className="form-label">
                    Client Area URL:
                    <input className="form-control" type="text" value={clientAreaURL} onChange={e => setClientAreaURL(e.target.value)} />
                </label>
                </div>

                <div className="form-group">    
                <label className="form-label">
                    Marketing Assets URL:
                    <input className="form-control" type="text" value={marketingAssetsURL} onChange={e => setMarketingAssetsURL(e.target.value)} />
                </label>
                </div>

                <div className="form-group">    
                <label className="form-label">
                    Game Certificates URL:
                    <input className="form-control" type="text" value={gameCertificatesURL} onChange={e => setGameCertificatesURL(e.target.value)} />
                </label>
                </div>
            
                <div className="form-group">    
                <label className="form-label">
                    Top 5 Markets:
                    <input className="form-control" type="text" value={topMarkets} onChange={e => setTopMarkets(e.target.value)} />
                </label>
                </div>

                <div className="form-group form-group-checkbox">    
                <label className="form-label-checkbox">
                    Direct Communication with Hub88 Operators:
                    <input  className="form-checkbox" type="checkbox" checked={directCommunication} onChange={e => setDirectCommunication(e.target.checked)} />
                </label>
                </div>
            </div>

            <div className="form-section">
                <div className="form-group">    
                <label className="form-label">
                    5 Most Popular Games:
                    <input className="form-control" type="text" value={popularGames} onChange={e => setPopularGames(e.target.value)} />
                </label>
                </div>

                <div className="form-group">    
                <label className="form-label">
                    Currencies Offered:
                    <input className="form-control" type="text" value={offeredCurrencies} onChange={e => setOfferedCurrencies(e.target.value)} />
                </label>
                </div>
            
                <div className="form-group">    
                <label className="form-label">
                    Max Exposure on Hub88:
                    <input className="form-control" type="text" value={maxExposure} onChange={e => setMaxExposure(e.target.value)} />
                </label>
                </div>

                <div className="form-group form-group-checkbox">    
                <label className="form-label-checkbox">
                    Support for Blue Dollar:
                    <input className="form-checkbox" type="checkbox" checked={supportsBlueDollar} onChange={e => setSupportsBlueDollar(e.target.checked)} />
                </label>
                </div>
            </div>
                <div className="form-group">    
                <label className="form-label">
                    Comments:
                    <textarea className="form-control" value={comments} onChange={e => setComments(e.target.value)} />
                </label>
                </div>
            
                <div className="form-group">
                <label className="form-label">
                    Attach File:
                    <input type="file" onChange={e => setFile(e.target.files[0])} />
                </label>
                </div>

                <div className="form-group">        
                    <button type="submit" className="form-submit">Submit</button>
                </div>
            </form>
        </div>
    );
    
};

export default SupplierWiki;
