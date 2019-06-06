import React from "react";
import debounce from "lodash/debounce";

//scss
import "./styles/menuSearch.scss";

class MenuSearch extends React.Component {
  componentDidMount() {
    document.querySelector(".searchInput").addEventListener("search", e => {
      let text = e.target.value;
      this.debounce_input(text);
    });
  }

  componentWillUnmount() {
    document
      .querySelector(".searchInput")
      .removeEventListener("search", () => {});
  }

  search = async input => {
    const blackList = [
      ".",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "+",
      "-",
      "=",
      "[",
      "]",
      "\\"
    ];
    const { data } = this.props;
    const _dataKeys = Object.keys(data.items);
    let big_bucket = [];
    let treated_input = "";

    // sanitize input
    for (let i = 0; i < input.length; i++) {
      let character = input.charAt(i);
      let found = blackList.find(element => element === character);

      if (found) {
        treated_input = `${treated_input}\\${character}`;
      } else {
        treated_input = `${treated_input}${input.charAt(i)}`;
      }
    }

    // core
    if (treated_input) {
      let expression = new RegExp(`${treated_input}`, "gi");

      // initial pruning of results
      let sectionsPromise = new Promise(resolve => {
        let bucket = [];
        for (const key of _dataKeys) {
          let fields = data.items[key];
          if (expression.test(fields.CATEGORY)) {
            let fields = data.items[key];
            let searchScore = this.score(
              fields.CATEGORY.toString(),
              expression
            );
            bucket.push({
              result: fields.CATEGORY,
              score: searchScore,
              id: fields.ID
            });
          }
        }

        resolve(bucket);
      });

      let pricePromise = new Promise(resolve => {
        let bucket = [];
        let expression = new RegExp(`${treated_input}`, "gi");
        for (const key of _dataKeys) {
          let fields = data.items[key];

          if (expression.test(fields.PRICE)) {
            let fields = data.items[key];
            let searchScore = this.score(
              fields.PRICE.toString(),
              expression,
              "price"
            );
            bucket.push({
              result: fields.PRICE,
              score: searchScore,
              id: fields.ID
            });
          }
        }

        resolve(bucket);
      });

      let itemNamePromise = new Promise(resolve => {
        let bucket = [];
        for (const key of _dataKeys) {
          let fields = data.items[key];

          if (expression.test(fields.NAME["en"])) {
            let fields = data.items[key];
            let searchScore = this.score(
              fields.NAME["en"].toString(),
              expression
            );
            bucket.push({
              result: fields.NAME["en"],
              score: searchScore,
              id: fields.ID
            });
          }
        }

        resolve(bucket);
      });

      let itemDescriptionPromise = new Promise(resolve => {
        let bucket = [];
        for (const key of _dataKeys) {
          let fields = data.items[key];

          if (expression.test(fields.DESCRIPTION["en"])) {
            let fields = data.items[key];
            let searchScore = fields.DESCRIPTION["en"]
              ? this.score(fields.DESCRIPTION["en"].toString(), expression)
              : "0.000";
            bucket.push({
              result: fields.DESCRIPTION["en"],
              score: searchScore,
              id: fields.ID
            });
          }
        }

        resolve(bucket);
      });

      // wait for parallel loops to finish
      let [sections, price, itemName, itemDesc] = await Promise.all([
        sectionsPromise,
        pricePromise,
        itemNamePromise,
        itemDescriptionPromise
      ]);

      // concat to one array
      big_bucket = big_bucket.concat(sections, price, itemName, itemDesc);

      let actionables = [];

      // filters out and scores duplicate id's
      let holder = {};
      for (let i = 0; i < big_bucket.length; i++) {
        if (holder.hasOwnProperty(big_bucket[i].id)) {
          holder[big_bucket[i].id] = {
            ...big_bucket[i],
            score: (parseFloat(big_bucket[i].score) + 0.8).toString()
          };
        } else {
          holder[big_bucket[i].id] = { ...big_bucket[i] };
        }
      }

      Object.keys(holder).map(x => actionables.push(holder[x]));

      // sort by match score (highest - lowest)
      actionables.sort((a, b) =>
        a.score < b.score ? 1 : b.score < a.score ? -1 : 0
      );

      return {
        res: actionables,
        length: input.length
      };
    }
  };

  score = (entry, regex, field) => {
    let matched = entry.match(regex);
    if (matched) {
      let result;
      switch (field) {
        case "price":
          let weight = 0;
          // weight decimal places and commas(maybe?) higher for prices
          for (let char of entry) {
            if (char === "." || char === ",") {
              weight += 0.2;
            }
          }

          result = matched.length / entry.length + weight;
          break;

        default:
          result = matched.length / entry.length;
          break;
      }
      return result.toFixed(3);
    }
  };

  handleInput = value => {
    const { onInput, setSearchRes } = this.props;

    this.search(value).then(result => {
      if (result) {
        onInput(result);
        setSearchRes(value, result.res, result.length);
      } else {
        onInput({ res: [], length: 0 });
        setSearchRes("", [], 0);
      }
    });
  };

  // group events
  debounce_input = debounce(text => this.handleInput(text), 250);

  render() {
    const { searchInUse, tagsInUse } = this.props;
    return (
      <div
        className={
          searchInUse || tagsInUse ? "searchCont searchInUse" : "searchCont"
        }
      >
        <input
          className="searchInput"
          type="search"
          placeholder="Search"
          onKeyUp={e => {
            let text = e.target.value;
            this.debounce_input(text);
          }}
        />
      </div>
    );
  }
}

export default MenuSearch;
