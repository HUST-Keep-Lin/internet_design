<template>
  <div class="about">
    <h1>一、问题定义</h1>
    随着物联网技术的发展和智能化生活的需求，养鱼作为一种趣味性和观赏性很高的休闲活动，也需要更加智能化和便捷化的管理方式。传统的鱼缸系统往往需要人工定期检测和调节水温、水质、光照、供氧等参数，以保证鱼类的健康生长，同时还需要手动换水、喂食等操作，这些都增加了养鱼者的时间和精力成本，也降低了养鱼的乐趣。
    为了解决这些问题，本项目旨在设计和实现一款基于物联网技术的智能鱼缸系统，该系统可以实现对鱼缸的远程监测和控制，提供舒适、便捷、节能的养鱼环境，增强用户的观赏、休闲、养生等多重功能。
    我们的目标是设计一种以嵌入式芯片为控制核心的多功能观赏鱼缸智能控制系统，综合利用嵌入式和物联网技术，通过相关传感器的应用，实现鱼缸水温恒定、定时自动喂食、自动换水、自动控制水位、自动加氧等功能；并可根据需要增加控制参数，通过选择不同元器件控制成本；另外还可通过系统中的通信模块，实现对鱼缸的远程控制和管理，通过
    WiFi摄像头，还可以实现对智能鱼缸的远程监控。
    <h1>二、需求分析</h1>
    根据上述的问题定义，本项目的需求如下：<br />
    <h2>功能需求：智能鱼缸系统应具备以下功能</h2>
    智能温控：能够根据设定的温度范围，自动调节加热棒的开关，保持鱼缸水温的稳定。<br />
    智能换水：能够根据设定的换水周期和换水量，自动控制水泵的开关，实现鱼缸水的自动更换。<br />
    智能供氧：能够根据设定的供氧时间和供氧量，自动控制气泵的开关，实现鱼缸水的自动增氧。<br />
    智能照明：能够根据设定的照明时间和照明强度，自动控制LED灯的开关和亮度，实现鱼缸光照的自动调节。<br />
    智能喂食：能够根据设定的喂食时间和喂食量，自动控制喂食器的开关和转速，实现鱼缸饲料的自动投放。<br />
    远程监测：能够通过通信模块连接物联网平台，并通过上位机APP实时查看鱼缸各项参数的数值和曲线图。<br />
    远程控制：能够通过通信模块连接物联网平台，并通过上位机APP远程设置鱼缸各项参数的设定值和开关状态。<br />
    本地操作：能够通过STM32单片机和OLED显示屏实现对鱼缸各项参数的本地设置和显示。<br />
    经过研究，确定以下功能实现可行性排序（由高到低）：<br />
    1、 温度检测和加热<br />
    2、 自动开灯和设置氛围灯<br />
    3、 自动换水和供氧<br />
    4、 自动喂食<br />
    5、 溶氧量检测和水质监测<br />
    至少实现1、2，尽量实现3、4，尝试实现5
    <h2>性能需求：智能鱼缸系统应满足以下性能要求</h2>
    稳定性：系统应能够正常运行，不出现死机、重启、卡顿等故障。<br />
    准确性：系统应能够准确测量和控制鱼缸各项参数，不出现误差、漂移、抖动等现象。<br />
    实时性：系统应能够及时响应用户的操作和指令，不出现延迟、丢包、断线等问题。<br />
    安全性：系统应能够保证用户和鱼类的安全，不出现触电、漏电、过热等危险。<br />

    <h1>三、 系统设计</h1>
    <h2>3.1系统总体设计</h2>
    根据智能鱼缸控制系统的设计要求，综合考虑成本因素与操作控制的简便，
    本文设计出了基于STM32芯片的智能鱼缸系统的总体框架，
    本设计将整个智能鱼缸控制系统分为了四个部分:第一部分是移动终端，通过app软件接收数据和发送控制指令;第二部分是云服务器，接收移动终端发送的指令，传输到控制系统，并接收相应的数据发送到移动终端;第三部分是系统的核心控制部分，由MCU、Wi-Fi模块等组成，负责数据的接收与处理，并发送到执行部分;第四部分是外部传感器以及由供加热棒、喂食器和灯光等组成的执行部分，传感器检测鱼缸中水温并将数据发送到STM32，而执行部分则根据接收的信号进行工作。
    本次设计的核心部分是第三部分，即系统的控制中心，又划分为Wi-Fi通信模块与MCU控制模块以及其它的外围电路。在设计中，依据不同功能的区分将控制中心部分细分成了五个模块:<br />
    1）电源供电模块 ； <br />
    2）ＭＣＵ控制与处理模块 ；<br />
    3）Wifi通信模块 ； <br />
    4）传感器模块 ； <br />
    5）继电器控制模块<br />
    各个模块相互配合工作，电源模块为各个子模块供电以提供动力，Wi-Fi通信模块将整个控制系统与云端服务器连接并进行数据的接收与发送，传感器模块通过各类传感器检测鱼缸各项参数发送到MCU中进行数据处理，MCU对接收的数据进行处理并做出相应的控制指令，发送到继电器控制模块，由继电器控制模块对执行部分进行控制，各个模块相辅相成，共同完成整个控制系统的工作。<br />
    <h2>3.2功能划分</h2>
    根据上面的需求分析，该系统应当具备以下功能：
    <h3>3.2.1用户管理</h3>
    本系统需要为用户提供注册和登录功能，用户登录后将设备与鱼缸进行绑定，方便后续管理。另外本系统还需要为管理员提供用户信息管理功能，方便查看整个系统的运行情况。
    1）
    为用户提供个人账户管理，让用户通过自己的账号密码可以随时随地多设备登录本系统平台，对鱼缸进行管理。让用户即便出门在外也可以看到鱼缸的状态，进行远程管理。<br />
    2） 为管理员提供用户信息管理，可以显示本系统在线人数等信息。<br />
    <h3>3.2.2监测记录</h3>
    通过多种传感器实时监测水温、水质和光照情况并上报数据，后台系统将情况显示在主界面上，并记录历史数据供用户查询。这是系统的核心功能，记录的数据让用户能对鱼缸情况进行全面掌握，同时也为系统的智能化管理提供了决策依据。<br />
    <h4>1） 水温监测</h4>
    水温是影响鱼生活环境的最重要的因素，也是智能鱼缸需要考虑的首要因素。在本系统中采用温度传感器采集水温数据，单片机将该数据上传至平台。后台将温度数据实时显示在用户端界面上，保证用户能够直观看到水温。同时用户可以自己设定温度管理方案，比如是否采用恒温策略，或者立即将水加热到某一特定温度等。这些功能的实现都需要水温数据作为基础。另外，系统会记录过去一段时间内水温数据供用户参考，这可以让用户了解一段时间内（如一天）的水温变化情况，据此能够更好地控制水温。
    <h4>2） 水质监测</h4>
    水质监测采用的浊度传感器利用光学原理，通过溶液中的透光率和
    散射率来综合判断浊度情况。传感器内部是一个红外线对管，当光线穿过一定量的水时，光线的透过量取决于该水的污浊程度，水越污浊，透过的光就越少。光接收端把透过的光强度转换为对应的电流大小，透过的光多，电流大，反之透过的光少，电流小。
    通过该传感器将鱼缸的水质参数采集上传，该数据可以用来指示用户及时换水，也可以配合水泵实现自动换水功能。用户可以为设置一个水质下限，当监测到水质低于该值时就启动自动换水。
    <h4>3） 光照监测</h4>
    光照监测采用光传感器，主要目的是通过监测鱼缸内光线环境实现自动开灯，保证鱼缸在光线较差时的观赏性。
    <h3>3.2.3智能管理</h3>
    智能管理是本系统的特色功能，利用嵌入式编程和物联网技术，可以实现养鱼自动化，为用户节省时间精力，更好地照顾鱼。根据系统监测的数据，系统可以自动进行恒温控制、夜间自动补光，自动换水等智能控制操作，也可以及时发出警告，提醒用户进一步采取措施。同时，用户也可自定义许多参数，来实现对鱼缸的个性化管理。
    <h4>1） 智能水温控制</h4>
    通过温度传感器和加热棒可以实现智能水温控制。系统为用户提供了恒温模式和环境温模式，用户可以自己设定。在环境温模式下，加热棒不主动工作，水温和环境温保持一致，但是温度传感器会实时监测水温，并当变得水温不适合鱼生活时进行提醒，由用户决定是否加热。在恒温模式下，用户设定一个适合的温度，系统将会根据当前水温和设定温度自动调用加热棒进行加热，以保持水温恒定，适合环境温度变化较大或不适合鱼生活的情景。不管在哪种情况下，用户都可以自己启动加热，并设定一定的加热时间或目标温度。
    <h4>2） 智能换水</h4>
    换水是养鱼过程中较为麻烦的一件事，但是水质又是对鱼来说比较重要的，因此本系统实现了方便的智能换水功能。智能换水依赖于水浊度传感器采集的水浊度数据，当水浑浊到一定程度上，自动启动水泵进行换水。当然，用户也可以在客户端上随时启动自动换水。另外，也可以利用换水功能实现降温效果。
    <h4>3） 智能开灯</h4>
    智能开灯的目的是使鱼缸在各种环境中都具有良好的观赏性。用户可以设置当环境光强低于某一值时，自动开启补光灯，也可以设定自动开启的时间和关闭的时间。
    <h4>4） 智能供氧</h4>
    水中的含氧量是关乎生物存亡的关键因素。对于生物较密集的鱼缸，供氧尤其重要。在本系统中，用户可以在设备平台上预约曝气时间。这样系统会按预约时间启动气泵向鱼缸中供氧。
    <h2>3.3模块设计</h2>
    <h3>3.3.1终端节点</h3>
    终端节点负责功能的具体实现，总体上可分为控制单元和采集单元，采集单元主要是一些传感器，用来监测环境参数，而控制单元包含多种元件，负责对鱼缸进行调控。

    <h3>3.3.2MCU控制与处理模块</h3>
    微控制单元(Microcontroller Unit;MCU)，又称单片微型计算机(Single
    ChipMicrocomputer)或者单片机，它将中央处理器(Central Process
    Unit;CPU)、内存等计算机的基本单元微型化处理，形成集合在一块芯片的计算机，它是智能鱼缸控制系统最关键的部分。
    <h3>3.3.3Wifi通信模块</h3>
    在本设计中实现远程数据的传输均需要通过Wi-Fi模块来完成，该部分也是本控制系统的核心。通过使用该模块，开发者能够让设计的系统连接网络，也能够单独借助它建立独立的网络控制器。
    <h3>3.3.4继电器控制模块</h3>
    本系统选用了电磁继电器，因接入的电源电压为5V，故选用了松乐公司生产的SRD-05VDC-SL-C型继电器。

    <h3>3.3.5 Web系统架构</h3>
    根据上面确定的功能，Web系统大致可以分为三个部分：实时信息展示，历史数据、个性化管理。
    <h4>1) 实时信息展示</h4>
    实时信息指通过传感器记录的鱼缸的当前时刻参数，这部分信息展示了鱼缸的最新状态，是用户最关心的信息，因此需要显示在最显眼的位置。另外该部分信息还要指导鱼缸的智能管理，因此可以将一些设置信息和其一起展示。具体说来，该系统需要实时展示的信息包括：水温、水质、灯光等环境信息，自动换水、自动开灯、自动投喂等控制信息。
    <h4>2) 历史数据记录</h4>
    历史数据是鱼缸过去一段时间内的信息，对于一般用户来说是不太重要的信息，因此可以放在一个单独的页面。当用户需要查看时，可以通过折线图等方式将历史数据的变化趋势进行直观地展现，以供用户参考。当数据较多时，用户也可设置保存的最大时限，以节省存储空间。另外，该界面还可以集成一些数据分析功能，对鱼缸的长期状态进行总结。
    <h4>3) 个性化管理</h4>
    这部分功能比较重要，也比较繁杂，因此可以单独采用一个页面。我们已经在实时信息展示页面显示了一部分控制信息，但是这些控制功能的具体设置还没有完成。当用户需要设置相关功能时，可以直接点击首页的相关显示区域跳转到设置界面。个性化管理内容应包括：
    <h4>1) 水温控制方案</h4>
    水温控制首先需要选择模式：恒温模式和环境温模式。两者区别上面已经说过。如果选择恒温模式，需要同时输入设定的恒定温度。如果选择环境温模式则不用设定。两种模式都可以预约加热功能，即设定预约温度、开始时间和结束时间，在该时间段内水温会被加热到预约温度，该段时间内不受温度模式影响，该段时间结束后恢复原设定模式。
    <h4>2) 换水方案</h4>
    由于是否换水和水质直接相关，因此用户可以设置水浊度阈值，当超过此阈值时启动换水。换水可以设定为持续一段时间后停止也可以设定为水浊度降到最低时停止。用户也可以不启动自动换水，而改为定时换水，即无论水质如何，到设定时间就换水。
    <h4>3) 灯光方案</h4>
    用户可以设置是否启动夜间自动补光，启动后当光传感器监测到环境光较低时自动开灯。用户也可以自己预约开灯时间。
    <h4>4) 供氧方案</h4>
    供氧情况需要用户自己判断，系统可以提供定时供氧和手动供氧。
    <h4>5) 投喂方案</h4>
    用户可以在平台上一键投喂，可以设置投喂量。也可以设置定时投喂。
    <h2>3.4界面</h2>
    根据上面确定的web功能模块，可以设计一个简单的展示界面，该界面对应上述实时信息展示模块，页面内容不再赘述
  </div>
</template>

<style>
.about {
  padding: 50px;
}
</style>
