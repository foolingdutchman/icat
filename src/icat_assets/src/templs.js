export const iCatsInfoTempl = (data) => `


<div id="cat-area" class="common-area">
 <section> <span>&nbsp;</span></section>
 <img id="cat-banner" class="common-image" src="cat-banner.gif"></img>
 <div id="cat-info-area " class="">
    <div class="horizon-div">
        <span class="big-label">Birth Date</span>
        <span class="big-label">Name</span>
        <span class="big-label">Gender</span>

    </div>
    <div class="horizon-div">
        <span id="cat-birth" class="label-tab"></span>
        <div class="label-tab">
            <span >${data.name}</span>
            <img>
        </div>
        
        <span class="label-tab">${
          data.gender == 0 
          ? "Female"
          : "Male"      
        } </span>

    </div>
  </div>

  <div id="cat-area-inner" class="common-area border-image-clip-path ">
    <div class="horizon-div">
        <span class="cat-label-tab">Hungry</span>
        <span class="cat-label-tab">Thirsty</span>
        <span class="cat-label-tab">Happyness</span>
    </div>
    <div class="horizon-div">
        <span >${data.thirsty}</span>
        <span >${data.hungry}</span>
        <span >${data.happyness}</span>
    </div>

    <img src="cat-1.gif" ></img>

  </div>

</div>
 
`;

export const userInfoTempl = (data) => `

<div id="user-area" class="common-area">
            <section> &nbsp;</section>
            <img id="avatar" class="common-image" src="avatar.png" alt="anonymous user" />

            <section>
                <label for="la_wallet_id">User Principal ID:&nbsp;</label>
                <span id="la_wallet_id"></span>
            </section>

            <section>
                <label for="balance">User balance: &nbsp;</label>
                <span id="balance"></span>
                <img class="icon" src="coin-small.png" />
            </section>
            <section><span id="greeting"></span></section>

            <div class="horizon-div">
                <div id="check_balance" class="sub-tab"><span>BALANCE</span></div>
                <div id="lo_out" class="sub-tab"><span>LOG OUT</span></div>
            </div>

        </div>

`;