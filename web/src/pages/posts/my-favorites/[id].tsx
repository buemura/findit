import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../../components/HeaderPage";
import { BodyStyled } from "../../../styles/components/middleSection";
import { MainContainer } from "../../../styles/pages/create-post";
import { Modal } from "../../../components/modal";

import { Authentication } from "../../../api/authentication";
import countries from "../../../utils/countries.json";
import { useRouter } from "next/router";
import { InputText, SelectStyled } from "../../../styles/pages/profile-edit";
import { Services } from "../../../api/services";
import { Categories } from "../../../api/categories";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const { id } = params;
  return {
    props: { id },
  };
};

export default function Posts({ id }) {
  const [post, setPost] = useState({
    id: "",
    user_id: "",
    title: "",
    category: "",
    description: "",
    price: "",
    city: "",
    state: "",
    country: "",
    created_at: "",
    updated_at: "",
    user: {
      id: "",
      name: "",
      email: "",
      user_photo: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      occupation: "",
      about_me: "",
      email_verified: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    },
  });

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
      const postData = await Services.getServiceByID(id);
      const allCategories = await Categories.getAllCategories();
      setPost(postData);
      setTitle(post.title);
      setDescription(post.description);
      setPrice(post.price);
      setCity(post.city);
      setState(post.state);
      setCountry(post.country);
      setCategories(allCategories);
    })();
  }, []);

  async function updateService(service_id: string) {
    const token: string = localStorage.getItem("token");

    let option_value = document.getElementById(
      "select--category"
    ) as HTMLSelectElement;
    let text: string = option_value.options[option_value.selectedIndex].text;
    //setCategory(text);
    let category = text;
    console.log(category);

    const completed = false;
    const result = await Services.updateService(
      service_id,
      completed,
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
            defaultValue={post.title}
            onChange={(e: { target: { value: string } }) =>
              setTitle(e.target.value)
            }
          />
        </div>
        <div className="category container">
          <span>Category* </span>
          <select name="category" id="select--category">
            {categories.map((c) => (
              <option value={c.category} key={c.category} selected>
                {c.category}
              </option>
            ))}
          </select>
        </div>
        <div className="description container">
          <span>Description* </span>
          <textarea
            name="service-description"
            placeholder={post.description}
            defaultValue={post.description}
            onChange={(e: { target: { value: string } }) =>
              setDescription(e.target.value)
            }
          />
        </div>
        <div className="price container">
          <span>Price* </span>
          <input
            type="number"
            name="service-price"
            placeholder={price}
            defaultValue={price}
            onChange={(e: { target: { value: string } }) =>
              setPrice(e.target.value)
            }
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
          <button
            className="save"
            onClick={() => {
              updateService(post.id);
            }}
          >
            Save
          </button>
        </div>
      </MainContainer>
    </BodyStyled>
  );
}
