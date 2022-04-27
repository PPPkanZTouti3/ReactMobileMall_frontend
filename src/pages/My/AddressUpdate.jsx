import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, TextareaItem, WingBlank, WhiteSpace, Picker, Toast } from 'antd-mobile'
import { Switch, Toast as Toast_v5 } from 'antd-mobile-v5'
import TextHeader from '@/components/Header/TextHeader'
import { reqUpdateAddress } from '@/api'
import { reqAliMap } from '@/api'
import { AliKey } from '@/config'

import '@/assets/styles/addressadd.scss'

class AddressUpdate extends Component {
  constructor(props) {
    super(props)
    const { recipient, phone, province, city, area, address, isDefault, _id, addressId } = this.props.location.state.addressInfo;
    this.state = {
      name: recipient,
      phone,
      address,
      _id,
      addressId,
      isDefault,
      provinces: [],
      provinceActive: {},
      provinceDefault: {},
      province,
      citys: [],
      cityActive: {},
      cityDefault: {},
      city,
      areas: [],
      areaActive: {},
      areaDefault: {},
      area,
      cols: 1
    }
  }
  async componentDidMount() {
    // 首先获取省份
    let provinceList = await reqAliMap(AliKey);
    this.getAddressArea(provinceList.districts[0].districts, 'provinces')
    let curProvince = this.state.provinces.filter((item) => {
      return item.label == this.state.province
    })

    // 市
    let cityList = await reqAliMap(AliKey, this.state.province);
    this.getAddressArea(cityList.districts[0].districts, 'citys')
    let curCity = this.state.citys.filter((item) => {
      return item.label == this.state.city
    })
    // 区
    let areaList = await reqAliMap(AliKey, this.state.city);
    this.getAddressArea(areaList.districts[0].districts, 'areas')
    let curArea = this.state.areas.filter((item) => {
      return item.label == this.state.area
    })
    this.setState({
      provinceActive: curProvince[0],
      cityActive: curCity[0],
      areaActive: curArea[0]
    })
  }

  // 转换属性名
  getAddressArea(addressList, type) {
    this.setState({
      [type]: addressList.map(item => {
        return {
          ...item,
          value: item.adcode,
          label: item.name
        }
      })
    })
  }
  async submit() {
    // 验证表格
    let myreg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    if (this.state.name === "") {
      Toast.info("请填写收货人");
    } else if (this.state.phone === "") {
      Toast.info("请填写手机号码");
    } else if (!myreg.test(this.state.phone)) {
      Toast.info("手机号码有误");
    } else if (this.state.province === '-请选择-' || this.state.province === "") {
      Toast.info("请选择省份");
    } else if (this.state.city === '-请选择-' || this.state.city === "") {
      Toast.info("请选择市");
    } else if (this.state.area === '-请选择-' || this.state.area === "") {
      Toast.info("请选择区");
    } else if (this.state.address === "") {
      Toast.info("请填写详细地址");
    }
    else {
      let { province, city, area, address, name, phone, isDefault, addressId, _id } = this.state;

      let info = {
        userId: this.props.user._id,
        _id,
        addressId,
        province,
        city,
        area,
        address,
        recipient: name,
        phone,
        isDefault: isDefault ? 1 : 0
      }

      let res = await reqUpdateAddress(info);
      if (res.status === 0) {
        Toast_v5.show({
          content: '修改成功',
          icon: 'success',
          afterClose: () => {
            this.props.history.replace('/my/address')
          },
        })
      } else {
        Toast_v5.show({
          content: '修改失败',
          icon: 'fail',
        })
      }
    }
  }

  handleSwitch = () => {
    this.setState({
      isDefault: !this.state.isDefault
    })
    console.log(this.state.isDefault)
  }

  render() {
    return (
      <div className="addressadd-page">
        <TextHeader returnbtn={true} title="修改地址" pathname="/my/address"></TextHeader>
        <div className="addressadd-main">
          <div className="addressadd">
            <div className="p-item">
              <label>
                <span className="tit">联系人</span>
                <input type="text" placeholder="姓名" value={this.state.name} onChange={(ev) => { this.setState({ name: ev.target.value }) }} />
              </label>
            </div>
            <div className="p-item">
              <label>
                <span className="tit">联系方式</span>
                <input type="text" placeholder="手机号码" value={this.state.phone} onChange={(ev) => { this.setState({ phone: ev.target.value }) }} />
              </label>
            </div>
            <div className="p-item">
              <label>
                <span className="tit">所在省</span>
                <Picker
                  data={this.state.provinces}
                  cols={this.state.cols}
                  value={[this.state.provinceActive.value]}
                  onPickerChange={(v) => {
                    let prov = this.state.provinces.filter((item) => {
                      return v[0] === item.value
                    })
                    this.setState({
                      provinceActive: prov[0]
                    })
                    return true;
                  }}
                  onOk={async v => {
                    let prov = this.state.provinces.filter(item => {
                      return v[0] === item.value
                    })
                    console.log(prov)
                    this.setState({
                      provinceDefault: prov[0],
                      province: prov[0].name,
                      cityDefault: {},
                      cityActive: { value: '110000' },
                      city: '-请选择-',
                      areaDefault: {},
                      areaActive: { value: '110000' },
                      area: ''
                    })
                    let res = await reqAliMap(AliKey, this.state.provinceActive.name);
                    let data = res.districts[0].districts;

                    this.getAddressArea(data, 'citys')
                    return true;
                  }}
                >
                  <div arrow="horizontal">{this.state.province}</div>
                </Picker>
              </label>
            </div>
            <div className="p-item">
              <label>
                <span className="tit">所在市</span>
                <Picker
                  data={this.state.citys}
                  cols={this.state.cols}
                  value={[this.state.cityActive.value]}
                  onPickerChange={(v) => {
                    console.log(v)
                    let prov = this.state.citys.filter(item => {
                      return v[0] === item.value
                    })
                    this.setState({
                      cityActive: prov[0]
                    })
                    return true;
                  }}
                  onOk={async v => {
                    let prov = this.state.citys.filter(item => {
                      return v[0] === item.value
                    })
                    console.log(prov)
                    this.setState({
                      cityDefault: prov[0],
                      city: prov[0].name,
                      areaActive: { value: '110000' },
                      areaDefault: {},
                      area: '-请选择-'
                    })
                    let res = await reqAliMap(AliKey, this.state.cityActive.name);
                    let data = res.districts[0].districts;

                    this.getAddressArea(data, 'areas')
                    return true;
                  }}
                >
                  <div arrow="horizontal">{this.state.city}</div>
                </Picker>
              </label>
            </div>
            <div className="p-item">
              <label>
                <span className="tit">所在区</span>
                <Picker
                  data={this.state.areas}
                  cols={this.state.cols}
                  value={[this.state.areaActive.value]}
                  onPickerChange={(v) => {
                    console.log(v)
                    let prov = this.state.areas.filter(item => {
                      return v[0] === item.value
                    })
                    this.setState({
                      areaActive: prov[0]
                    })
                    return true;
                  }}
                  onOk={v => {
                    let prov = this.state.areas.filter(item => {
                      return v[0] === item.value
                    })
                    console.log(prov)
                    this.setState({
                      areaDefault: prov[0],
                      area: prov[0].name
                    })
                    return true;
                  }}
                >
                  <div arrow="horizontal">{this.state.area}</div>
                </Picker>
              </label>
            </div>
            <div className="p-item">
              <label>
                <span className="tit">详细地址</span>
                <TextareaItem rows="3" placeholder="详细地址需填写楼栋楼层或房间号信息" value={this.state.address} onChange={(val) => { this.setState({ address: val }) }}></TextareaItem>
              </label>
            </div>
            <WhiteSpace />

            <div className='isDefault'>
              <div className="isDefault-text">设为默认收货地址</div>
              <div className='switch'>
                <Switch
                  defaultChecked
                  style={{
                    '--checked-color': '#00b578',
                    '--height': '36px',
                    '--width': '60px',
                  }}
                  checked={this.state.isDefault}
                  onChange={this.handleSwitch}
                />
              </div>
            </div>

            <WingBlank>
              <Button type="primary" onClick={() => {
                this.submit()
              }}>修改地址</Button>
            </WingBlank>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({ user: state.user })
)(AddressUpdate)
