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
import { Comments } from "../../../api/comments";
import { Feedback } from "../../../api/feedback";

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

  const [comments, setComments] = useState([]);

  const [completed, setCompleted] = useState(false);
  const [completedBy, setCompletedBy] = useState("");
  const [starValue, setStarValue] = useState(0);
  const [evaluationValue, setEvaluationValue] = useState(0);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const postData = await Services.getServiceByID(id);
      const allCategories = await Categories.getAllCategories();
      const allComments = await Comments.getAllComments(id);

      setPost(postData);
      setTitle(post.title);
      setDescription(post.description);
      setPrice(post.price);
      setCity(post.city);
      setState(post.state);
      setCountry(post.country);
      setCategories(allCategories);
      setComments(allComments);
    })();
  }, []);

  async function updateService(service_id: string) {
    const id: string = Authentication.checkUserSession("");
    const token: string = localStorage.getItem("token");

    let option_value = document.getElementById(
      "select--category"
    ) as HTMLSelectElement;
    let text: string = option_value.options[option_value.selectedIndex].text;
    //setCategory(text);
    let category = text;
    console.log(category);

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

    if (completed) {
      const comment = comments.filter(
        (comment) => comment.user.name == completedBy
      );
      const user_id = comment[0]?.user.id;

      await Services.completeService(user_id, service_id, token);
      await Feedback.postFeedback(user_id, id, String(evaluationValue), token);
    }

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

  function avaliation(value) {
    setEvaluationValue(value);
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

        <div className="conclusion container">
          <div className="conclusion--status">
            <span>Completed ?</span>
            <input
              type="checkbox"
              name="status"
              id="status"
              onChange={() => {
                setCompleted(true);
              }}
            />
          </div>
        </div>

        <div className="avaliation container">
          <span>Completed by</span>
          <div className="select-div">
            <select
              name="contractors"
              id="select--contractors"
              className="select--contractors"
              onChange={(event) => {
                setCompletedBy(event.target.value);
              }}
            >
              <option disabled selected value={""}>
                {" "}
                -- Select an Option --{" "}
              </option>
              {comments.map((comment) => (
                <option value={comment.user.name} key={comment.id}>
                  {comment.user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="stars">
            <div
              className="star v00"
              onMouseOver={() => {
                setStarValue(0);
              }}
              onClick={() => {
                avaliation(0);
              }}
            ></div>
            <div
              className="star v05"
              style={
                starValue >= 0.5
                  ? {
                      filter: "grayscale(0)",
                      WebkitFilter: "grayscale(0) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
                  : {
                      filter: "grayscale(1)",
                      WebkitFilter: "grayscale(1) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
              }
              onMouseLeave={() => {
                setStarValue(evaluationValue);
              }}
              onMouseOver={() => {
                setStarValue(0.5);
              }}
              onClick={() => {
                avaliation(0.5);
              }}
            ></div>
            <div
              className="star v10"
              style={
                starValue >= 1
                  ? {
                      filter: "grayscale(0)",
                      WebkitFilter: "grayscale(0) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
                  : {
                      filter: "grayscale(1)",
                      WebkitFilter: "grayscale(1) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
              }
              onMouseLeave={() => {
                setStarValue(evaluationValue);
              }}
              onMouseOver={() => {
                setStarValue(1);
              }}
              onClick={() => {
                avaliation(1);
              }}
            ></div>
            <div
              className="star v15"
              style={
                starValue >= 1.5
                  ? {
                      filter: "grayscale(0)",
                      WebkitFilter: "grayscale(0) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
                  : {
                      filter: "grayscale(1)",
                      WebkitFilter: "grayscale(1) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
              }
              onMouseLeave={() => {
                setStarValue(evaluationValue);
              }}
              onMouseOver={() => {
                setStarValue(1.5);
              }}
              onClick={() => {
                avaliation(1.5);
              }}
            ></div>
            <div
              className="star v20"
              style={
                starValue >= 2
                  ? {
                      filter: "grayscale(0)",
                      WebkitFilter: "grayscale(0) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
                  : {
                      filter: "grayscale(1)",
                      WebkitFilter: "grayscale(1) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
              }
              onMouseLeave={() => {
                setStarValue(evaluationValue);
              }}
              onMouseOver={() => {
                setStarValue(2);
              }}
              onClick={() => {
                avaliation(2);
              }}
            ></div>
            <div
              className="star v25"
              style={
                starValue >= 2.5
                  ? {
                      filter: "grayscale(0)",
                      WebkitFilter: "grayscale(0) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
                  : {
                      filter: "grayscale(1)",
                      WebkitFilter: "grayscale(1) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
              }
              onMouseLeave={() => {
                setStarValue(evaluationValue);
              }}
              onMouseOver={() => {
                setStarValue(2.5);
              }}
              onClick={() => {
                avaliation(2.5);
              }}
            ></div>
            <div
              className="star v30"
              style={
                starValue >= 3
                  ? {
                      filter: "grayscale(0)",
                      WebkitFilter: "grayscale(0) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
                  : {
                      filter: "grayscale(1)",
                      WebkitFilter: "grayscale(1) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
              }
              onMouseLeave={() => {
                setStarValue(evaluationValue);
              }}
              onMouseOver={() => {
                setStarValue(3);
              }}
              onClick={() => {
                avaliation(3);
              }}
            ></div>
            <div
              className="star v35"
              style={
                starValue >= 3.5
                  ? {
                      filter: "grayscale(0)",
                      WebkitFilter: "grayscale(0) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
                  : {
                      filter: "grayscale(1)",
                      WebkitFilter: "grayscale(1) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
              }
              onMouseLeave={() => {
                setStarValue(evaluationValue);
              }}
              onMouseOver={() => {
                setStarValue(3.5);
              }}
              onClick={() => {
                avaliation(3.5);
              }}
            ></div>
            <div
              className="star v40"
              style={
                starValue >= 4
                  ? {
                      filter: "grayscale(0)",
                      WebkitFilter: "grayscale(0) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
                  : {
                      filter: "grayscale(1)",
                      WebkitFilter: "grayscale(1) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
              }
              onMouseLeave={() => {
                setStarValue(evaluationValue);
              }}
              onMouseOver={() => {
                setStarValue(4);
              }}
              onClick={() => {
                avaliation(4);
              }}
            ></div>
            <div
              className="star v45"
              style={
                starValue >= 4.5
                  ? {
                      filter: "grayscale(0)",
                      WebkitFilter: "grayscale(0) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
                  : {
                      filter: "grayscale(1)",
                      WebkitFilter: "grayscale(1) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
              }
              onMouseLeave={() => {
                setStarValue(evaluationValue);
              }}
              onMouseOver={() => {
                setStarValue(4.5);
              }}
              onClick={() => {
                avaliation(4.5);
              }}
            ></div>
            <div
              className="star v50"
              style={
                starValue >= 5
                  ? {
                      filter: "grayscale(0)",
                      WebkitFilter: "grayscale(0) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
                  : {
                      filter: "grayscale(1)",
                      WebkitFilter: "grayscale(1) opacity(1)",
                      backgroundImage: "url('/icons/star.png')",
                    }
              }
              onMouseLeave={() => {
                setStarValue(evaluationValue);
              }}
              onMouseOver={() => {
                setStarValue(5);
              }}
              onClick={() => {
                avaliation(5);
              }}
            ></div>
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
