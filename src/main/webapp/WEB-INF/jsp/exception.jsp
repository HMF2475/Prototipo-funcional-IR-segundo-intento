<%@ page session="false" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="kubico" tagdir="/WEB-INF/tags" %>

<kubico:layout pageName="error">

    <spring:url value="/resources/images/pets.png" var="petsImage"/>
    <img src="${petsImage}"/>

    <h2>Something happened...</h2>

    <p>${exception.message}</p>

</kubico:layout>
