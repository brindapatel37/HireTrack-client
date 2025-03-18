import axios from "axios";
import { useState, useEffect } from "react";
import { baseURL } from "../../scripts/utils";
import deleteButton from "../../assets/icons/delete.svg";
import editButton from "../../assets/icons/edit.svg";
import chevronButton from "../../assets/icons/typcn--chevron-right.svg";
import "./JobsTable.scss";
import { Link, useParams } from "react-router-dom";
