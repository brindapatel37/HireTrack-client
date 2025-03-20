import axios from "axios";
import { useState, useEffect } from "react";
import { baseURL } from "../../scripts/utils";
import "./ResumeResponse.scss";
import ReactMarkdown from "react-markdown";

function ResumeResponse({ response }) {
  const getMatchScoreClass = (score) => {
    if (score >= 1 && score <= 3) return "form__match-score--low";
    if (score >= 4 && score <= 6) return "form__match-score--medium";
    if (score >= 7 && score <= 10) return "form__match-score--high";
    return "";
  };

  return (
    <div className="form__response-box">
      <h1 className="form__response--header"> Resume Feedback </h1>
      <div className="form__match-score">
        <h2 className="form__response--title"> Match Score </h2>
        <div
          className={`form__match-score--desc form__response--desc ${getMatchScoreClass(
            response.matchScore
          )}`}
        >
          {response.matchScore}/10
        </div>
        <p className="form__match-score--par">
          {" "}
          The match score is a number from 1 to 10 indicating how well the
          resume matches the job description
        </p>
      </div>
      <div className="form__strengths">
        <h2 className="form__response--title"> Resume Strengths </h2>
        <div className="form__strengths--desc form__response--desc">
          {" "}
          {response.strengths.map((strength) => (
            <li className="form__strengths--list" key={strength}>
              {" "}
              {strength}
            </li>
          ))}
        </div>
      </div>
      <div className="form__weaknesses">
        <h2 className="form__response--title"> Resume Weaknesses </h2>
        <div className="form__weaknesses--desc form__response--desc">
          {" "}
          {response.weaknesses.map((weakness) => (
            <li className="form__weaknesses--list" key={weakness}>
              {" "}
              {weakness}
            </li>
          ))}
        </div>
      </div>
      <div className="form__suggestions">
        <h2 className="form__response--title"> Overall Suggestions </h2>
        <div className="form__suggestions--desc form__response--desc">
          {" "}
          {response.suggestions.map((suggestion) => (
            <li className="form__suggestions--list" key={suggestion}>
              {" "}
              {suggestion}
            </li>
          ))}
        </div>
      </div>
      <div className="form__improved-resume">
        <h2 className="form__response--title"> Improved Resume </h2>
        <div className="form__improved-resume--desc form__response--desc">
          {" "}
          <ReactMarkdown>{response.improvedResume}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ResumeResponse;
