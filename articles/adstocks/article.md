# **First step to measuring the long-term impact of Marketing: The Memory Effect**

## **Why model the memory effect?**

All marketers know that the impact of your advertising extends not just today, but also tomorrow, next week, and next month. But how best to measure that? That's where tracking the memory effect comes in.

In reality, we know that advertising memories and brand equity decay rather than vanish instantly. Measuring this will increase model accuracy and provide the best estimate of ROIs. 

In an MMM (marketing mix model), we typically measure this impact with a memory effect or adstock. But this impact can take many forms. So let's look at three approaches we use to capture the Memory effect.

**1\. Geometric-decay adstock**

### **Concept**

The most simple of our examples, the geometric decay, assumes a “constant rate” reduction of effect over the coming days/ weeks.  

To capture this, we use a single retention parameter θ (0 \< θ \< 1). This says what proportion of last period’s effect survives into the next. A high amount, then we get lots of ongoing impact, potentially an upper funnel campaign. A lower amount means most of the impact comes in day/ week 1\.

Mathematically, for spend xtx\_txt​:

x\~t=xt+θxt−1+θ2xt−2+…\\tilde x\_t \= x\_t \+ \\theta x\_{t-1} \+ \\theta^2 x\_{t-2} \+ \\dotsx\~t​=xt​+θxt−1​+θ2xt−2​+…

## **2\. Weibull adstock**

### **Concept**

Instead of a constant decay, the **Weibull** kernel lets the decay rate itself vary with time. This reflects that the impact in weeks 1-2 may be different to weeks 2-3 and so on. 

With **shape k and scale λ**:

wl=exp⁡ ⁣\[−(l/λ)k\],l=0,1,2,…w\_l \= \\exp\\\!\\bigl\[-(l/λ)^{k}\\bigr\],\\quad l=0,1,2,\\dotswl​=exp\[−(l/λ)k\],l=0,1,2,…

* **k \< 1** → fast initial drop, then long tail (good for quick-impact media).  
* **k \> 1** → “S-shaped” build-up before decaying, capturing delayed awareness (e.g., TV bursts).

### **Advantages & cautions**

* Greater flexibility reflects real funnel dynamics.  
* Requires non-linear optimisation; risk of over-fitting if data are scarce.  
* More parameters to estimate compared to geometric decay.

## **3\. Split-variable (current \+ lagged geometric)**

### **Concept**

This allows us to separate the initial marketing from its subsequent decay. This is better used when there are known delays to the activity, e.g. direct mail (delayed by post) or an influencer activity (when activity is seen over time). 

To build this, we use  **two variables in our analysis**:

1. **Current-week spend** xtx\_txt​ – captures immediate “pop”.  
2. **Lagged geometric adstock** x\~t(θ)\\tilde x\_{t}^{(\\theta)}x\~t(θ)​ – same θ as classic geometric.

This lets the model estimate separate coefficients, often revealing that short-term ROI differs sharply from longer-term brand effect.

### **Pros & cons**

* **Pros:** Extra flexibility; aids interpretability for campaign planners and addresses known delays (e.g. delivery).  
* **Cons:** Adds collinearity risk and degrees of freedom

## **Choosing the right form**

| Criterion | Geometric | Weibull | Split Variable |
| ----- | ----- | ----- | ----- |
| **\# Parameters** | 1 | 2 | 1 (θ) \+ extra β |
| **Computation** | Fast linear | Non-linear | Linear but multicollinear |
| **Captures delay of media delivery?** | No | Yes | Yes (via lag) |
| **Risk of overfit** | Low | Medium–High | Medium |
| **When to prefer** | Exploratory, digital | TV, upper-funnel, long memory | Stakeholders need to see short vs long-term |

In practice, many teams **start geometric**, test Weibull, then keep the split-variable only if coefficients are stable and VIF \< 5

## **Take-aways**

* **Adstock is not optional**; it’s fundamental to the valid measurement of your marketing campaigns.  
* **Geometric** is the dependable baseline; **Weibull** offers realism when media build slowly; **Split-variable** unveils distinct tactical vs brand pay-offs.  
* Always **cross-validate** and check out-of-sample fit, not just in-sample R²  
* Memory effects are the first tool in your ability to measure long-term impacts. See [this article](https://linea-analytics.com/articles/measuring-long-term/article.html) for how to get a more holistic viewpoint

Feel free to embed the widgets above in your own notebook or BI tool, tweak the sliders, and see how carry-over assumptions reshape sales curves and optimal budgets.

