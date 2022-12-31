import pandas as pd
f=pd.read_csv("source.csv")
keep_col = ['haha','wtf']
new_f = f[keep_col]

di = {64: 0, 192: 1, 320: 2, 448: 3}
new_f = new_f.replace({'haha': di})

new_f.to_csv("newFile.csv", index=False)
