# Demystifying building an MMM model

A question we are often asked is “How do you build an MMM model?” At the core of MMM are statistical techniques that are often technical and confusing. The interactive charts in this article aim to assist the learning process.

## The basic MMM model

MMM models build a statistical relationship between changes in the:

- Dependent variables - Sales, New customers, Web Visits etc.
- Independent variables - media spend, pricing, and economic factors

The MMM model aims to calculate the coefficient of the independent variables. Let's look at one of the most common model-building methods used - ordinary least squares.

## Ordinary Least Squares (OLS)

OLS estimates coefficients that describe the relationship between the dependent and independent variables. For example, it can determine how much of an increase in sales is driven by an increase in media spend while accounting for other influencing factors like seasonality and trends. Without getting caught up in the maths, this algorithm estimates coefficients for a linear model by minimising the sum of squared errors (the distance between actual and predicted sales, for example).

Let's have a try. This is an example of a simple OLS model that illustrates the concept of squared errors. Use the sliders to change the values of the intercept and the coefficient, the values estimated by the regression algorithm. Remember, the aim is to make the errors (the blue boxes) as small as possible.

<div id="ols-widget"></div>

## Time series and OLS

Similarly to the previous example, we can visualise the same linear model by looking at the data over time. The linear model works in the same way; it is only the way we are looking at the model that has changed. Here we are visualising the contribution of each variable in explaining the fluctuations in our Sales. 

Changing the values of the sliders illustrates how coefficients determine the size of a variable’s impact (i.e. Media Spend’s contribution).

<div id="ts-ols-widget"></div>

While OLS is powerful in its simplicity, it is just one of many algorithms that can be used to estimate these relationships. Other MMM techniques include Log linear, Bayesian & hierarchical Bayesian. Each has its strengths and weaknesses.

In addition, more complex models may incorporate other advanced techniques, particularly when non-linear relationships need to be modelled. For example:
* Measuring the multiplicative impact of media with key seasonality
* Measuring the long-term impact of media 
* Measuring how media impacts change with spending
