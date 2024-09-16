import { NextPage } from "next";
import React from "react";
import { AssessmentResultField } from "../_components/assessment/AssessmentResult";
import { AuthContainer } from "../_components/common/AuthContainer";

const AssessmentResult: NextPage = () => {
  return (
    <AuthContainer>
      <AssessmentResultField />
    </AuthContainer>
  );
};

export default AssessmentResult;
