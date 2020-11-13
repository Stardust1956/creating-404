<view wx:if="{{booklist.length === 0}}"style="display: flex;flex-direction: row;justify-content: center;">
 <van-row>
  <van-col span="24">
  <van-image
  width="15rem"
  height="20rem"
  fit="contain"
  src="../img/购物车.svg"
/>
  </van-col> 
</van-row> 

</view>

<view wx:for="{{booklist}}">
  <van-card
  price="{{item.nowprice}}"
  desc="{{item.author}}"
  title="{{item.title}}"
  thumb="{{item.pic}}"
  origin-price="{{item.price}}"
  >
  <view slot="tags">
    <van-tag plain type="warning">{{item.position}}</van-tag>
  </view>
  <view slot="tags">
    <van-tag plain type="warning"> {{item.appearance}}成新</van-tag>
  </view>
  <view slot="footer">
    <button size="mini" plain="true" style="border-color: #e0620d;">交易完成</button>
    <button size="mini" plain="true" style="border-color: #e0620d;">下架</button>
</view>
</van-card>
</view>