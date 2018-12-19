import React, { Component } from 'react';
import axios from 'axios';

class ManageProduk extends Component {

    state = { listPopok: [], idTabel: 0 }

    componentDidMount() {
        this.getPopokList();
    }

    getPopokList = () => {
        axios.get('http://localhost:1997/popok')
        .then((res) => {
            this.setState({ listPopok: res.data, idTabel: 0 })
            // console.log(this.state.listPopok)
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var merk = this.refs.merkAdd.value;
        var harga = this.refs.hargaAdd.value;
        var img = this.refs.imgAdd.value;
        var description = this.refs.descAdd.value;

        if(nama === '' || merk === '' || harga === '' || img === '' || description === ''){
            window.alert('Ada kolom yang belum di isi !!!')
        }else{
            axios.post('http://localhost:1997/popok', {
                nama, merk, harga, img, description
            }).then((res) => {
                this.getPopokList();
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')){
            axios.delete('http://localhost:1997/popok/' + id)
                .then((res) => {
                    this.getPopokList();
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    onBtnEditText = (idNya) => {  
        this.setState({ idTabel: idNya })   
    }

    //SAVE
    onBtnSaveClick = (id) => {
        var nama = this.refs.namaSAVE.value;
        var merk = this.refs.merkSAVE.value;
        var harga = parseInt(this.refs.hargaSAVE.value);
        var img = this.refs.imgSAVE.value;
        var description = this.refs.descSAVE.value;

        axios.put('http://localhost:1997/popok/' + id, {
            nama, merk, harga, img, description
        }).then((res) => {
            //this.setState({idTabel:0})
            this.getPopokList();
            // console.log('masuk')
        }).catch((err) => {
            console.log(err)
        })
    }

    //Cancel
    onCancel = () => {  
        this.setState({ idTabel: 0 })   
    }

    renderBodyPopok = () => {
        var listJSXPopok = this.state.listPopok.map(({ id, nama, merk, description, harga, img }) => {
            // console.log(`${this.state.idTabel} --- ${id}`)
            if(this.state.idTabel === id){
                return (
                    <tr>
                        <td>{id}</td>
                        <td><input ref="namaSAVE" type="text" defaultValue={nama} className="form-control" style={{width: "100px"}} /></td>
                        
                        <td>
                            <select ref="merkSAVE" defaultValue={merk} className="form-control">
                                <option>Bronson</option>
                                <option>Uchiha</option>
                                <option>Bunting</option>
                            </select>
                        </td>

                        {/* <td><input ref="merkSAVE" type="text" defaultValue={merk} /></td> */}
                        
                        <td><input ref="hargaSAVE" type="number" defaultValue={harga} className="form-control" style={{width: "100px"}} /></td>
                        <td><input ref="imgSAVE" type="text" defaultValue={img} className="form-control" /></td>
                        <td><textarea ref="descSAVE" defaultValue={description} className="form-control"></textarea></td>
                        <td><input className="btn btn-success" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={this.onCancel}/></td>
                    </tr>
                )
            }else{
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{merk}</td>
                        <td>{harga}</td>
                        <td><img src={img} width="50px" alt={id}/></td>
                        <td>{description}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.onBtnEditText(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                    </tr>
                )
            }
        })
        return listJSXPopok;
    }

    render(){
        return(
            <div>

                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                        <div className="page-title-wrap">
                            <div className="page-title-inner">
                            <div className="row">
                                <div className="col-md-4">
                                <div className="bread"><a href="#">Home</a> › Manage Produk</div>
                                <div className="bigtitle">Manage Produk</div>
                                </div>
                                <div className="col-md-3 col-md-offset-5">
                                <button className="btn btn-default btn-red btn-lg">Manage Produk</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="title-bg">
                        <div className="title">Daftar Produk</div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered chart">
                            <thead>
                                <tr>
                                <th>Id</th>
                                <th>Nama Produk</th>
                                <th>Merk</th>
                                <th>Harga</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBodyPopok()}
                            </tbody>
                          
                        </table>

                        <div className="title-bg">
                            <div className="title">Tambah Produk</div>
                        </div>

                        <table className="table table-bordered chart">
                            <thead>
                                <tr>
                                    <th>Nama Produk</th>
                                    <th>Merk</th>
                                    <th>Harga</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                              
                                    <td><input ref="namaAdd" type="text" placeholder="Nama Produk" className="form-control" style={{width: "120px"}} /></td>
                                    <td>
                                        <select ref="merkAdd" className="form-control" >
                                            <option>Bronson</option>
                                            <option>Uchiha</option>
                                            <option>Bunting</option>
                                        </select>
                                    </td>
                                    <td><input ref="hargaAdd" type="number" placeholder="Harga Produk" className="form-control" style={{width: "130px"}} /></td>
                                    <td><input ref="imgAdd" type="text" placeholder="Image URL" className="form-control" /></td>
                                    <td>
                                        <textarea ref="descAdd" placeholder="Enter The Description Here..." className="form-control" style={{width: "200px"}}></textarea>
                                    </td>
                                    <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick}/></td>
                              
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                </div>

            </div>
        )
    }
}

export default ManageProduk;