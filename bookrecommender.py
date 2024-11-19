import numpy as np
import pandas as pd
import json
import pickle
books = pd.read_csv('books.csv',low_memory=False)
ratings = pd.read_csv('ratings.csv')
pt = pickle.load(open('pt.pkl', 'rb'))
similarity_scores = pickle.load(open('similarity_scores.pkl', 'rb'))
ratings_with_name = ratings.merge(books,on='ISBN')
x = ratings_with_name.groupby('User-ID').count()['Book-Rating'] > 200
user = x[x].index
filtered_rating = ratings_with_name[ratings_with_name['User-ID'].isin(user)]
y = filtered_rating.groupby('Book-Title').count()['Book-Rating']>=50
famous_books = y[y].index
final_ratings = filtered_rating[filtered_rating['Book-Title'].isin(famous_books)]
pt = final_ratings.pivot_table(index='Book-Title',columns='User-ID',values='Book-Rating')
pt.fillna(0,inplace=True)
def recommend(book_name):
    try:
        index = np.where(pt.index == book_name)[0][0]
        similar_items = sorted(
            list(enumerate(similarity_scores[index])),
            key=lambda x: x[1],
            reverse=True
        )[1:5] 
        recommended_titles = []
        for i in similar_items:
            recommended_titles.append(pt.index[i[0]])  
        return json.dumps(recommended_titles)  
    except IndexError:
        return json.dumps([])
if __name__ == "__main__":
    import sys
    book_name = sys.argv[1] if len(sys.argv) > 1 else ''
    recommendations = recommend(book_name)
    print(recommendations) 

pickle.dump(pt,open('pt.pkl','wb'))
pickle.dump(books,open('books.pkl','wb'))
pickle.dump(similarity_scores,open('similarity_scores.pkl','wb'))
