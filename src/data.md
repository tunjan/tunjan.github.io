---
title: data
layout: default.liquid
---

## Data analysis

### Preprocessing
```python
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

num_features = [feature for feature in X_train.columns if X_train[feature].dtype in ['int64', 'float64']]
cat_features = [feature for feature in X_train.columns if X_train[feature].nunique() < 10 and X_train[feature].dtype == "object"]

my_cols = cat_features + num_features

X_train = X_train[my_cols].copy()
X_val = X_val[my_cols].copy()
X_test = test_df[my_cols].copy()

cat_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

num_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

preprocessor = ColumnTransformer([
    ('num', num_transformer, num_features),
    ('cat', cat_transformer, cat_features)
])

pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier())
])
```
### Hyperparameter tunning

```python
xgb_model = XGBClassifier(
    learning_rate=0.01, 
    n_estimators=400, 
    objective='binary:logistic',
    nthread=1
)

pipeline_xgb = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', xgb_model)
])

params_xgb = {
    'classifier__min_child_weight': [1, 5, 7, 10],
    'classifier__gamma': [0.2, 0.5, 1, 1.5, 2, 5],
    'classifier__subsample': [0.4, 0.6, 0.8, 1.0],
    'classifier__colsample_bytree': [0.4, 0.6, 0.8, 1.0],
    'classifier__max_depth': [2, 3, 4, 5, 6, 7],
    'classifier__learning_rate': [0.001, 0.01, 0.1],
    'classifier__n_estimators': [100, 200, 400, 600]
}

folds = 20
param_comb = 20
skf = StratifiedKFold(n_splits=folds, shuffle = True, random_state = 1001)
random_search = RandomizedSearchCV(pipeline_xgb, param_distributions=params_xgb, n_iter=param_comb, scoring='accuracy',n_jobs=4, cv=skf.split(X_train,y_train), verbose=3, random_state=1001 )
random_search.fit(X_train, y_train)

pipeline_xgb.set_params(**random_search.best_params_)
pipeline_xgb.fit(X_train, y_train)

y_val_xgb_pred = pipeline_xgb.predict(X_val)
accuracy = classification_report(y_val, y_val_xgb_pred)
print(f"Accuracy: {accuracy}")

pipeline_xgb.fit(X, y)

y_pred_test_xgb = pipeline_xgb.predict(X_test)
```

### Model Selection

```python

classifiers = {
    "LogisticRegression" : LogisticRegression(random_state=0),
    "KNN" : KNeighborsClassifier(),
    "SVC" : SVC(random_state=0, probability=True),
    "RandomForest" : RandomForestClassifier(random_state=0),
    "XGBoost" : XGBClassifier(random_state=0, use_label_encoder=False, eval_metric='logloss'), # XGBoost takes too long
    "LGBM" : LGBMClassifier(random_state=0),
    "CatBoost" : CatBoostClassifier(random_state=0, verbose=False),
    "NaiveBayes": GaussianNB()
}

LR_grid = {'penalty': ['l1','l2'],
           'C': [0.25, 0.5, 0.75, 1, 1.25, 1.5],
           'max_iter': [50, 100, 150]}

KNN_grid = {'n_neighbors': [3, 5, 7, 9],
            'p': [1, 2]}

SVC_grid = {'C': [0.25, 0.5, 0.75, 1, 1.25, 1.5],
            'kernel': ['linear', 'rbf'],
            'gamma': ['scale', 'auto']}

RF_grid = {'n_estimators': [50, 100, 150, 200, 250, 300],
        'max_depth': [4, 6, 8, 10, 12]}

boosted_grid = {'n_estimators': [50, 100, 150, 200],
        'max_depth': [4, 8, 12],
        'learning_rate': [0.05, 0.1, 0.15]}

NB_grid={'var_smoothing': [1e-10, 1e-9, 1e-8, 1e-7]}

# Dictionary of all grids
grid = {
    "LogisticRegression" : LR_grid,
    "KNN" : KNN_grid,
    "SVC" : SVC_grid,
    "RandomForest" : RF_grid,
    "XGBoost" : boosted_grid,
    "LGBM" : boosted_grid,
    "CatBoost" : boosted_grid,
    "NaiveBayes": NB_grid
}


i=0
clf_best_params=classifiers.copy()
valid_scores=pd.DataFrame({'Classifer':classifiers.keys(), 'Validation accuracy': np.zeros(len(classifiers)), 'Training time': np.zeros(len(classifiers))})
for key, classifier in classifiers.items():
    start = time.time()
    clf = GridSearchCV(estimator=classifier, param_grid=grid[key], n_jobs=-1, cv=None)

    # Train and score
    clf.fit(X_train, y_train)
    valid_scores.iloc[i,1]=clf.score(X_valid, y_valid)

    # Save trained model
    clf_best_params[key]=clf.best_params_
    
    # Print iteration and training time
    stop = time.time()
    valid_scores.iloc[i,2]=np.round((stop - start)/60, 2)
    
    print('Model:', key)
    print('Training time (mins):', valid_scores.iloc[i,2])
    print('')
    i+=1

valid_scores

```
