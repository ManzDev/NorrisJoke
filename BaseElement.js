import { LitElement, html, css } from "https://cdn.skypack.dev/lit-element";

const URL = "https://api.chucknorris.io/jokes/random";

class NorrisJoke extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
    };
  }

  static get styles() {
    return css`
      .container {
        display: inline-flex;
        max-width: 500px;
        border: 1px solid #999;
        padding: 5px;
        padding-right: 20px;
        border-radius: 10px;
        font-family: "Montserrat";
        background: #eee;
      }
      .container > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      img {
        width: 60px;
        height: 60px;
        margin-right: 10px;
      }
      p {
        margin: 0;
      }
      time {
        font-family: Arial;
        font-size: 12px;
        color: purple;
      }
    `;
  }

  getData() {
    return html`
      <div class="container">
        <img src="${this.data.icon_url}" alt="Chuck Norris" />
        <div>
          <p>${this.data.value}</p>
          <time>${this.data.updated_at}</time>
        </div>
      </div>
    `;
  }

  loadingData() {
    return html`
      <div class="container">
        <span>Loading...</span>
      </div>
    `;
  }

  firstUpdated() {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => (this.data = data));
  }

  // async firstUpdated() {
  //   Method 2: Async/Await
  //   const response = await fetch(URL);
  //   this.data = await response.json();
  // }

  render() {
    console.log("Renderizando: ", this.data);
    return html`${this.data ? this.getData() : this.loadingData()}`;
  }
}

customElements.define("norris-joke", NorrisJoke);
