import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { MainContainer } from "../../styles/pages/create-post";
import { Modal } from "../../components/modal";

import { Authentication } from "../../api/authentication";
import countries from "../../utils/countries.json";
import { useRouter } from "next/router";
import { InputText, SelectStyled } from "../../styles/pages/profile-edit";
import { Services } from "../../api/services";
import { Categories } from "../../api/categories";

export default function Posts() {
  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalPositive, setIsModalPositive] = useState<boolean>(true);

  const [hasSelectedCountry, setHasSelectedCountry] = useState<boolean>(false);
  const [mapIndex, setMapIndex] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const allCategories = await Categories.getAllCategories();
      setCategories(allCategories);
    })();
  }, []);

  async function postService() {
    const token: string = localStorage.getItem("token");
    const id = Authentication.checkUserSession("");

    let option_value = document.getElementById(
      "select--category"
    ) as HTMLSelectElement;
    let text: string = option_value.options[option_value.selectedIndex].text;
    //setCategory(text);
    let category = text;
    console.log(category);

    const result = await Services.createService(
      id,
      title,
      category,
      description,
      price,
      city,
      state,
      country,
      token
    );

    if (result === true) {
      setIsModalPositive(true);
      setIsModalVisible(true);
      return;
    }

    setIsModalPositive(false);
    setIsModalVisible(true);

    return;
  }

  function onChangeSelectCountry(): void {
    const select = document.getElementById(
      "country-select"
    ) as HTMLSelectElement;
    const value: string = select.options[select.selectedIndex].value;
    const index: number = select.options[select.selectedIndex].index;

    setCountry(value);
    setHasSelectedCountry(true);
    setMapIndex(index);
  }

  function onChangeSelectState(): void {
    const select = document.getElementById("state-select") as HTMLSelectElement;
    const value: string = select.options[select.selectedIndex].value;

    setState(value);
  }

  return (
    <BodyStyled>
      {isModalVisible ? (
        <Modal
          onClose={() => setIsModalVisible(false)}
          message={
            isModalPositive
              ? "Your service was posted successfully! Click here to redirect you to home page."
              : "Unable to post service. Check the information and try again later!"
          }
        ></Modal>
      ) : null}
      <HeaderPage />
      <MainContainer>
        <div className="title container">
          <span>Service title*</span>
          <input
            type="text"
            name="title"
            placeholder="Web Site Development"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="category container">
          <span>Category* </span>
          <select name="category" id="select--category">
            {categories.map((c) => (
              <option value={c.category} key={c.category}>
                {c.category}
              </option>
            ))}
          </select>
        </div>
        <div className="description container">
          <span>Description* </span>
          <textarea
            name="service-description"
            placeholder="I need a web site development for my company"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="price container">
          <span>Price* </span>
          <input
            type="number"
            name="service-price"
            placeholder="R$ 500,00"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="location container">
          <div>
            <div className="country divisions">
              <span>Country *</span>
              <SelectStyled
                id="country-select"
                onChange={onChangeSelectCountry}
              >
                {countries.map(({ name }) =>
                  name === country ? (
                    <option key={name.toString()} value={name} selected>
                      {name}
                    </option>
                  ) : (
                    <option key={name.toString()} value={name}>
                      {name}
                    </option>
                  )
                )}
              </SelectStyled>
            </div>

            <div className="state divisions">
              <span>State *</span>
              <SelectStyled
                id="state-select"
                default={state}
                onChange={onChangeSelectState}
              >
                {hasSelectedCountry ? (
                  countries[mapIndex].states.map(({ name }) =>
                    name === state ? (
                      <option key={name.toString()} value={name} selected>
                        {name}
                      </option>
                    ) : (
                      <option key={name.toString()} value={name}>
                        {name}
                      </option>
                    )
                  )
                ) : (
                  <option value={state}>{state}</option>
                )}
              </SelectStyled>
            </div>

            <div className="city divisions">
              <span>City *</span>
              <InputText
                type="text"
                placeholder={city}
                defaultValue={city}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setCity(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="buttons  divisions">
          <button className="discart" onClick={() => router.push("/home")}>
            Cancel
          </button>
          <button className="save" onClick={postService}>
            Post Service
          </button>
        </div>
      </MainContainer>
    </BodyStyled>
  );
}
